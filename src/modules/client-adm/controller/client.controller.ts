import { Router } from 'express';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';
import { ClientPresenter } from './client.presenter';

const clientController = Router();

clientController.post('/', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const client = await useCase.add(req.body);
    res.status(201).json(client);
});

clientController.get('/', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const clients = await useCase.findAll()
    res.json(ClientPresenter.toJSONArray(clients));
});

clientController.get('/:id', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const client = await useCase.find({ id: req.params.id })
    if (client) {
        res.json(ClientPresenter.toJSON(client));
    } else {
        res.status(404).send('Cliente não encontrado');
    }
});

export default clientController;
