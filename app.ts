import express from 'express';

const app = express();
app.use(express.json());

const clientFacade = ClientAdmFacadeFactory.create();

app.get('/clients/:id', async (req, res) => {
    try {
        const client = await clientFacade.find({ id: req.params.id });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default app;