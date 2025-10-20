import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Address from '../../@shared/domain/value-object/address';
import OrderItem from './order.item.entity';
import { OrderStatus } from './order.status';

type OrderProps = {
  id?: string;
  clientId: string;
  invoiceId?: string;
  status: OrderStatus;
  totalAmount: number;
  billingAddress: Address;
  shippingAddress: Address;
  paymentMethod: string;
  items: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Order extends BaseEntity implements AggregateRoot {

  private _clientId: string;
  private _invoiceId: string;
  private _status: OrderStatus;
  private _totalAmount: number;
  private _billingAddress: Address;
  private _shippingAddress: Address;
  private _paymentMethod: string;
  private _items: OrderItem[];

  constructor(props: OrderProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._clientId = props.clientId;
    this._invoiceId = props.clientId;
    this._status = props.status;
    this._totalAmount = props.totalAmount;
    this._billingAddress = props.billingAddress;
    this._shippingAddress = props.shippingAddress;
    this._paymentMethod = props.paymentMethod;
    this._items = props.items;
  }

  /**
   * Getter clientId
   * @return {string}
   */
  public get clientId(): string {
    return this._clientId;
  }

  /**
   * Getter invoiceId
   * @return {string}
   */
  public get invoiceId(): string {
    return this._invoiceId;
  }

  /**
   * Getter status
   * @return {OrderStatus}
   */
  public get status(): OrderStatus {
    return this._status;
  }

  /**
   * Getter totalAmount
   * @return {number}
   */
  public get totalAmount(): number {
    return this._totalAmount;
  }

  /**
   * Getter billingAddress
   * @return {Address}
   */
  public get billingAddress(): Address {
    return this._billingAddress;
  }

  /**
   * Getter shippingAddress
   * @return {Address}
   */
  public get shippingAddress(): Address {
    return this._shippingAddress;
  }

  /**
   * Getter paymentMethod
   * @return {string}
   */
  public get paymentMethod(): string {
    return this._paymentMethod;
  }

  /**
   * Getter items
   * @return {OrderItem[]}
   */
  public get items(): OrderItem[] {
    return this._items;
  }

  /**
   * Setter clientId
   * @param {string} value
   */
  public set clientId(value: string) {
    this._clientId = value;
  }

  /**
   * Setter invoiceId
   * @param {string} value
   */
  public set invoiceId(value: string) {
    this._invoiceId = value;
  }

  /**
   * Setter status
   * @param {OrderStatus} value
   */
  public set status(value: OrderStatus) {
    this._status = value;
  }

  /**
   * Setter totalAmount
   * @param {number} value
   */
  public set totalAmount(value: number) {
    this._totalAmount = value;
  }

  /**
   * Setter billingAddress
   * @param {Address} value
   */
  public set billingAddress(value: Address) {
    this._billingAddress = value;
  }

  /**
   * Setter shippingAddress
   * @param {Address} value
   */
  public set shippingAddress(value: Address) {
    this._shippingAddress = value;
  }

  /**
   * Setter paymentMethod
   * @param {string} value
   */
  public set paymentMethod(value: string) {
    this._paymentMethod = value;
  }

  /**
   * Setter items
   * @param {OrderItem[]} value
   */
  public set items(value: OrderItem[]) {
    this._items = value;
  }

}