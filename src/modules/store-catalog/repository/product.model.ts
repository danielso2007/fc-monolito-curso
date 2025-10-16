import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>
> {
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
