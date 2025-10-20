import OrderItem from "../domain/order.item.entity";

export default interface OrderItemGateway {
  save(client: OrderItem): Promise<OrderItem>;
  find(id: string): Promise<OrderItem>;
  findAll(): Promise<OrderItem[]>;
};
