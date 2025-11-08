process.on('uncaughtException', (error: Error) => {
    console.error('💥 ERRO FATAL (Uncaught Exception): O processo será encerrado.');
    console.error(`Mensagem: ${error.message}`);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
});

// Captura rejeições de Promises que não têm um .catch()
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('🚨 REJEIÇÃO NÃO TRATADA:', reason);
    console.error('Promise que falhou:', promise);
    process.exit(1);
});

import app from "./app";

const PORT = process.env.PORT || 3000;

async function startApp() {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor ou DB:", error);
        process.exit(1);
    }
}

startApp();
