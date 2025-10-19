import express from 'express';
import { sequelize } from './infrastructure/db';
import clientController from './modules/client-adm/controller/client.controller';
import invoiceController from './modules/invoice/controller/invoice.controller';

const app = express();
app.use(express.json());

app.use('/clients', clientController);
app.use('/invoices', invoiceController)

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado!');
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});

export default app;
