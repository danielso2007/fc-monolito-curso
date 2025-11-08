import Address from "../../../../modules/@shared/domain/value-object/address"

export interface CheckoutUseCaseInputDto {
    clientId: string
    invoiceId?: string
    totalAmount: number
    billingAddress: Address
    shippingAddress: Address
    paymentMethod: string
    items: CheckoutOrderItemUseCaseInputDto[]
    createdAt?: Date
    updatedAt?: Date
}

export interface CheckoutOrderItemUseCaseInputDto {
    productId: string
    productName: string
    price: number
    quantity: number
}

export interface CheckoutUseCaseOutputDto {
    id: string
    clientId: string
    invoiceId: string
    status: string
    totalAmount: number
    billingAddress: Address
    shippingAddress: Address
    paymentMethod: string;
    items: CheckoutOrderItemUseCaseOutputDto[]
    createdAt: Date
    updatedAt: Date
}

export interface CheckoutOrderItemUseCaseOutputDto {
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