import BaseEntity from '../../@shared/domain/entity/base.entity';
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import InvoiceItems from './invoice.itens.entity';
import Address from '../../@shared/domain/value-object/address';

type InvoiceProps = {
  id?: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItems[];

  constructor(
    props: InvoiceProps
  ) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter document
   * @return {string}
   */
  public get document(): string {
    return this._document;
  }

  /**
   * Getter address
   * @return {Address}
   */
  public get address(): Address {
    return this._address;
  }

  /**
   * Getter items
   * @return {InvoiceItems[]}
   */
  public get items(): InvoiceItems[] {
    return this._items;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter document
   * @param {string} value
   */
  public set document(value: string) {
    this._document = value;
  }

  /**
   * Setter address
   * @param {Address} value
   */
  public set address(value: Address) {
    this._address = value;
  }

  /**
   * Setter items
   * @param {InvoiceItems[]} value
   */
  public set items(value: InvoiceItems[]) {
    this._items = value;
  }

}
