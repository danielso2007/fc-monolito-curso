import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

@Table({
  modelName: 'product-store-table',
  tableName: 'products',
  timestamps: false
})
export default class ProductStoreModel extends Model<InferAttributes<ProductStoreModel>, InferCreationAttributes<ProductStoreModel>> {
  @PrimaryKey
  @Column({ type: DataType.STRING, allowNull: false })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare salesPrice: number;
}
