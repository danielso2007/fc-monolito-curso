import ProductStoreModel from '../repository/product.store.model';

export default interface ProductGateway {
  findAll(): Promise<ProductStoreModel[]>;
  find(id: string): Promise<ProductStoreModel>;
};
