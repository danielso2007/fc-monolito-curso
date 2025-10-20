import Address from "../../@shared/domain/value-object/address";
import { CheckoutOutputDto } from "../facade/checkout.interface";

export class CheckoutPresenter {
    static toJSON(input: CheckoutOutputDto): any {
        console.log('Prese', input);
        if (!input) {
            return {};
        }

        let items;

        if (!input && input.items.length > 0) {
            items = input.items.map((value) => ({
                id: value.id,
                orderId: value.orderId,
                productId: value.productId,
                productName: value.productName,
                price: value.price,
                quantity: value.quantity,
                subtotal: value.subtotal,
                createdAt: value.createdAt,
                updatedAt: value.updatedAt
            }));
        }

        return {
            id: input.id,
            clientId: input.clientId,
            invoiceId: input.invoiceId,
            status: input.status,
            totalAmount: input.totalAmount,

            billingAddress: {
                street: input.billingAddress.street,
                number: input.billingAddress.number,
                complement: input.billingAddress.complement,
                city: input.billingAddress.city,
                state: input.billingAddress.state,
                zipCode: input.billingAddress.zipCode,
            },

            shippingAddress: {
                street: input.shippingAddress.street,
                number: input.shippingAddress.number,
                complement: input.shippingAddress.complement,
                city: input.shippingAddress.city,
                state: input.shippingAddress.state,
                zipCode: input.shippingAddress.zipCode,
            },

            items: items,

            paymentMethod: input.paymentMethod,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        };
    }
}
