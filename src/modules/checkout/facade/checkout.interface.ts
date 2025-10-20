import Address from "../../@shared/domain/value-object/address";

export interface CheckoutInputDto {
  clientId: string
  invoiceId?: string
  totalAmount: number
  billingAddress: Address
  shippingAddress: Address
  paymentMethod: string
  items: CheckoutOrderItemInputDto[]
  createdAt?: Date
  updatedAt?: Date
}

export interface CheckoutOrderItemInputDto {
  productId: string
  productName: string
  price: number
  quantity: number
}

export interface CheckoutOutputDto {
  id: string
  clientId: string
  invoiceId: string
  status: string
  totalAmount: number
  billingAddress: Address
  shippingAddress: Address
  paymentMethod: string;
  items: CheckoutOrderItemOutputDto[]
  createdAt: Date
  updatedAt: Date
}

export interface CheckoutOrderItemOutputDto {
  id: string
  orderId: string
  productId: string
  productName: string
  price: number
  quantity: number
  subtotal: number
  createdAt: Date
  updatedAt: Date
}

export default interface CheckoutFacadeInterface {
  checkout(client: CheckoutInputDto): Promise<CheckoutOutputDto>;
};

