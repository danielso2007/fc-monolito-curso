import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderStatus } from '../../domain/order.status';

@Table({
  tableName: 'order',
  timestamps: false
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: true })
  declare clientId: string;

  @Column({ allowNull: true })
  declare invoiceId: string;

  @Column({ allowNull: false })
  declare status: OrderStatus;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare totalAmount: number;

  // declare billingAddress: Address;
  @Column({ allowNull: false })
  declare billingAddressStreet: string;

  @Column({ allowNull: false })
  declare billingAddressNumber: string;

  @Column({ allowNull: true })
  declare billingAddressComplement: string;

  @Column({ allowNull: false })
  declare billingAddressCity: string;

  @Column({ allowNull: false })
  declare billingAddressState: string;

  @Column({ allowNull: false })
  declare billingAddressZipcode: string;

  // declare shippingAddress: Address;
  @Column({ allowNull: false })
  declare shippingAddressStreet: string;

  @Column({ allowNull: false })
  declare shippingAddressNumber: string;

  @Column({ allowNull: true })
  declare shippingAddressComplement: string;

  @Column({ allowNull: false })
  declare shippingAddressCity: string;

  @Column({ allowNull: false })
  declare shippingAddressState: string;

  @Column({ allowNull: false })
  declare shippingAddressZipcode: string;

  @Column({ allowNull: false })
  declare paymentMethod: string;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;

}