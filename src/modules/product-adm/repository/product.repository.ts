import Product from '../domain/product.entity';
import ProductGateway from '../gateway/product.gateway';
import { sequelize } from '../infrastructure/db';
import { ProductModel } from './product.model';

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await sequelize.sync();

    await ProductModel.create({
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<Product> {
    await sequelize.sync();

    const product = await ProductModel.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
