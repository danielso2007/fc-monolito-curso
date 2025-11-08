import { Router } from 'express';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import { InvoicePresenter } from './invoice.presenter';

const invoiceController = Router();

invoiceController.post('/', async (req, res) => {
    const useCase = InvoiceFacadeFactory.create();
    const invoice = await useCase.generate(req.body);
    res.status(201).json(InvoicePresenter.toJSONArrayGenerate(invoice));
});

invoiceController.get('/', async (req, res) => {
    const useCase = InvoiceFacadeFactory.create();
    const invoices = await useCase.findAll();
    res.json(InvoicePresenter.toJSONArray(invoices));
});

invoiceController.get('/:id', async (req, res) => {
    const useCase = InvoiceFacadeFactory.create();
    const invoice = await useCase.find({ id: req.params.id })
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).send('Fatura não encontrada');
    }
});

export default invoiceController;
