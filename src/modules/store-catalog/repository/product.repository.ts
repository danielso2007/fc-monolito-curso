import ProductGateway from '../gateway/product.gateway';
import ProductStoreModel from './product.store.model';

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<ProductStoreModel[]> {
    const products = await ProductStoreModel.findAll();

    return products.map(
      (product) =>
        new ProductStoreModel({
          id: product.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }
  async find(id: string): Promise<ProductStoreModel> {
    const product = await ProductStoreModel.findOne({
      where: {
        id: id,
      },
    });

    return new ProductStoreModel({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
