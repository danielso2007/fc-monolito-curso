import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

sequelize.addModels([TransactionModel]);
