import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import InvoiceItemModel from "../modules/invoice/repository/invoice.itens.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

sequelize.addModels([ClientModel, InvoiceModel, InvoiceItemModel, TransactionModel, ProductModel, ProductModel]);
