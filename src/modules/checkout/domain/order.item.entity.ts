import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';

type OrderItemProps = {
    id?: string;
    orderId: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class OrderItem extends BaseEntity implements AggregateRoot {

    private _orderId: string;
    private _productId: string;
    private _productName: string;
    private _price: number;
    private _quantity: number;
    private _subtotal: number;

    constructor(props: OrderItemProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._orderId = props.orderId;
        this._productId = props.productId;
        this._productName = props.productName;
        this._price = props.price;
        this._quantity = props.quantity;
        this._subtotal = props.subtotal;
    }

    /**
     * Getter orderId
     * @return {string}
     */
    public get orderId(): string {
        return this._orderId;
    }

    /**
     * Getter productId
     * @return {string}
     */
    public get productId(): string {
        return this._productId;
    }

    /**
     * Getter productName
     * @return {string}
     */
    public get productName(): string {
        return this._productName;
    }

    /**
     * Getter price
     * @return {number}
     */
    public get price(): number {
        return this._price;
    }

    /**
     * Getter quantity
     * @return {number}
     */
    public get quantity(): number {
        return this._quantity;
    }

    /**
     * Getter subtotal
     * @return {number}
     */
    public get subtotal(): number {
        return this._subtotal;
    }

    /**
     * Setter orderId
     * @param {string} value
     */
    public set orderId(value: string) {
        this._orderId = value;
    }

    /**
     * Setter productId
     * @param {string} value
     */
    public set productId(value: string) {
        this._productId = value;
    }

    /**
     * Setter productName
     * @param {string} value
     */
    public set productName(value: string) {
        this._productName = value;
    }

    /**
     * Setter price
     * @param {number} value
     */
    public set price(value: number) {
        this._price = value;
    }

    /**
     * Setter quantity
     * @param {number} value
     */
    public set quantity(value: number) {
        this._quantity = value;
    }

    /**
     * Setter subtotal
     * @param {number} value
     */
    public set subtotal(value: number) {
        this._subtotal = value;
    }


}