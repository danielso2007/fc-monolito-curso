import Product from '../domain/product.entity';
import ProductGateway from '../gateway/product.gateway';
import { sequelize } from '../infrastructure/db';
import ProductModel from './product.model';

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    await sequelize.sync();

    const products = await ProductModel.findAll();

    return products.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }
  async find(id: string): Promise<Product> {
    await sequelize.sync();

    const product = await ProductModel.findOne({
      where: {
        id: id,
      },
    });

    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
