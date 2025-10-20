
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import { CheckoutUseCaseInputDto, CheckoutUseCaseOutputDto } from './checkout.usecase.dto';
import OrderGateway from '../../gateway/order.gateway';
import OrderItemGateway from '../../gateway/order.item.gateway';
import { OrderStatus } from '../../domain/order.status';
import OrderItem from '../../domain/order.item.entity';
import Order from '../../domain/order.entity';

export default class CheckoutUseCase implements UseCaseInterface {

    private _repositoryOrder: OrderGateway;
    private _repositoryOrderItem: OrderItemGateway;

    constructor(repositoryOrder: OrderGateway, repositoryOrderItem: OrderItemGateway) {
        this._repositoryOrder = repositoryOrder;
        this._repositoryOrderItem = repositoryOrderItem;
    }

    async execute(input: CheckoutUseCaseInputDto): Promise<CheckoutUseCaseOutputDto> {

        const listItems = input.items.map((value) => new OrderItem({
            orderId: null,
            productId: value.productId,
            productName: value.productName,
            price: value.price,
            quantity: value.quantity,
            subtotal: value.quantity * value.price
        }));

        const amount = listItems.reduce((sum, item) => sum + item.subtotal, 0);

        const orderProps = {
            clientId: input.clientId,
            invoiceId: input.invoiceId,
            status: OrderStatus.EM_PROCESSAMENTO,
            totalAmount: amount,
            billingAddress: input.billingAddress,
            shippingAddress: input.shippingAddress,
            paymentMethod: input.paymentMethod,
            items: listItems
        }

        const order = await this._repositoryOrder.save(new Order(orderProps));

        for (const value of listItems) {
            value.orderId = order.id;
            await this._repositoryOrderItem.save(value);
        }

        return {
            id: order.id,
            clientId: order.clientId,
            invoiceId: order.invoiceId,
            status: order.status,
            totalAmount: order.totalAmount,
            billingAddress: order.billingAddress,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            items: order.items,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    }
}