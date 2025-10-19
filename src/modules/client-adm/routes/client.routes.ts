import { Router } from 'express';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

const clientRouter = Router();

clientRouter.post('/', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const client = await useCase.add(req.body);
    res.status(201).json(client);
});

clientRouter.get('/', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const clients = await useCase.findAll()
    res.json(clients);
});

clientRouter.get('/:id', async (req, res) => {
    const useCase = ClientAdmFacadeFactory.create();
    const client = await useCase.find({ id: req.params.id })
    if (client) {
        res.json(client);
    } else {
        res.status(404).send('Cliente não encontrado');
    }
});

export default clientRouter;
