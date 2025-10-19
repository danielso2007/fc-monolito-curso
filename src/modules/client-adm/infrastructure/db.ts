import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

sequelize.addModels([ClientModel]);
