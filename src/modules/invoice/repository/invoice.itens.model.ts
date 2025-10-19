import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'invoiceItem',
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false, field: 'invoice_id' })
  declare invoiceId: string;

  @Column({ allowNull: false, field: 'created_at' })
  declare createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  declare updatedAt: Date;

}