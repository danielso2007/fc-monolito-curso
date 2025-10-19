import express from 'express';
import clientRouter from './modules/client-adm/routes/client.routes';
import { sequelize } from './infrastructure/db';

const app = express();
app.use(express.json());

app.use('/clients', clientRouter);

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado!');
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});

export default app;
