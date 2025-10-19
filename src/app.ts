import express from "express";
import ClientAdmFacadeFactory from "./modules/client-adm/factory/client-adm.facade.factory";

const app = express();
app.use(express.json());

const clientFacade = ClientAdmFacadeFactory.create();

app.get("/clients/:id", async (req, res) => {
    try {
        const client = await clientFacade.find({ id: req.params.id });
        res.json(client);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/clients", async (req, res) => {
    try {
        const input = req.body;
        const client = await clientFacade.add(input);
        res.status(201).json(client);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default app;
