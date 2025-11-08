import OrderItem from '../../domain/order.item.entity';
import OrderItemGateway from '../../gateway/order.item.gateway';
import { OrderItemModel } from './order.item.model';


export default class OrderItemRepository implements OrderItemGateway {

  async save(input: OrderItem): Promise<OrderItem> {
    await OrderItemModel.create({
      id: input.id,
      orderId: input.orderId,
      productId: input.productId,
      price: input.price,
      quantity: input.quantity,
      subtotal: input.subtotal,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });

    return new OrderItem({
      id: input.id,
      orderId: input.orderId,
      productId: input.productId,
      productName: input.productName,
      price: input.price,
      quantity: input.quantity,
      subtotal: input.subtotal,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });
  }

  async find(id: string): Promise<OrderItem> {
    const entity = await OrderItemModel.findOne({ where: { id } });

    if (!entity) {
      throw new Error('Order not found');
    }

    return new OrderItem({
      id: entity.id,
      orderId: entity.orderId,
      productId: entity.productId,
      productName: null,
      price: entity.price,
      quantity: entity.quantity,
      subtotal: entity.subtotal,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });
  }

  async findAll(): Promise<OrderItem[]> {
    const clientList = await OrderItemModel.findAll();

    return clientList.map((entity) => new OrderItem({
      id: entity.id,
      orderId: entity.orderId,
      productId: entity.productId,
      productName: null,
      price: entity.price,
      quantity: entity.quantity,
      subtotal: entity.subtotal,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }));
  }
}