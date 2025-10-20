import Address from '../../../@shared/domain/value-object/address';
import Order from '../../domain/order.entity';
import OrderGateway from '../../gateway/order.gateway';
import { OrderModel } from './order.model';


export default class OrderRepository implements OrderGateway {

  async save(input: Order): Promise<Order> {
    await OrderModel.create({
      id: input.id,
      clientId: input.clientId,
      invoiceId: input.invoiceId,
      status: input.status,
      totalAmount: input.totalAmount,

      billingAddressStreet: input.billingAddress.street,
      billingAddressNumber: input.billingAddress.number,
      billingAddressComplement: input.billingAddress.complement,
      billingAddressCity: input.billingAddress.city,
      billingAddressState: input.billingAddress.state,
      billingAddressZipcode: input.billingAddress.zipCode,

      shippingAddressStreet: input.shippingAddress.street,
      shippingAddressNumber: input.shippingAddress.number,
      shippingAddressComplement: input.shippingAddress.complement,
      shippingAddressCity: input.shippingAddress.city,
      shippingAddressState: input.shippingAddress.state,
      shippingAddressZipcode: input.shippingAddress.zipCode,

      paymentMethod: input.paymentMethod,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });

    return new Order({
      id: input.id,
      clientId: input.clientId,
      invoiceId: input.invoiceId,
      status: input.status,
      totalAmount: input.totalAmount,

      billingAddress: new Address(
        input.billingAddress.street,
        input.billingAddress.number,
        input.billingAddress.complement,
        input.billingAddress.city,
        input.billingAddress.state,
        input.billingAddress.zipCode,
      ),

      shippingAddress: new Address(
        input.shippingAddress.street,
        input.shippingAddress.number,
        input.shippingAddress.complement,
        input.shippingAddress.city,
        input.shippingAddress.state,
        input.shippingAddress.zipCode,
      ),

      items: null,

      paymentMethod: input.paymentMethod,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });
  }

  async find(id: string): Promise<Order> {
    const entity = await OrderModel.findOne({ where: { id } });

    if (!entity) {
      throw new Error('Order not found');
    }

    return new Order({
      id: entity.id,
      clientId: entity.clientId,
      invoiceId: entity.invoiceId,
      status: entity.status,
      totalAmount: entity.totalAmount,

      billingAddress: new Address(
        entity.billingAddressStreet,
        entity.billingAddressNumber,
        entity.billingAddressComplement,
        entity.billingAddressCity,
        entity.billingAddressState,
        entity.billingAddressZipcode,
      ),

      shippingAddress: new Address(
        entity.shippingAddressStreet,
        entity.shippingAddressNumber,
        entity.shippingAddressComplement,
        entity.shippingAddressCity,
        entity.shippingAddressState,
        entity.shippingAddressZipcode,
      ),

      items: null,

      paymentMethod: entity.paymentMethod,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });
  }

  async findAll(): Promise<Order[]> {
    const orderList = await OrderModel.findAll();

    return orderList.map((entity) => new Order({
      id: entity.id,
      clientId: entity.clientId,
      invoiceId: entity.invoiceId,
      status: entity.status,
      totalAmount: entity.totalAmount,

      billingAddress: new Address(
        entity.billingAddressStreet,
        entity.billingAddressNumber,
        entity.billingAddressComplement,
        entity.billingAddressCity,
        entity.billingAddressState,
        entity.billingAddressZipcode,
      ),

      shippingAddress: new Address(
        entity.shippingAddressStreet,
        entity.shippingAddressNumber,
        entity.shippingAddressComplement,
        entity.shippingAddressCity,
        entity.shippingAddressState,
        entity.shippingAddressZipcode,
      ),

      items: null,

      paymentMethod: entity.paymentMethod,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }));
  }
}