import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductCreationAttributes, ProductProps } from "../domain/product.entity";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model<ProductProps, ProductCreationAttributes> {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare salesPrice: number;
}
