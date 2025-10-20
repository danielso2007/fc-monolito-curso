import express from 'express';
import { sequelize } from './infrastructure/db';
import clientController from './modules/client-adm/controller/client.controller';
import invoiceController from './modules/invoice/controller/invoice.controller';
import checkoutController from './modules/checkout/controller/checkout.controller';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/clients', clientController);
app.use('/invoices', invoiceController);
app.use('/checkout', checkoutController);

app.use((req, res, next) => {
    console.error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: {
            code: 404,
            message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
        }
    });
});

app.use(errorHandler);

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado!');
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});

export default app;
