import Order from "../domain/order.entity";

export default interface OrderGateway {
  save(order: Order): Promise<Order>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
};
