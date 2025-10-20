import OrderItemRepository from './order.item.repository';
import { OrderItemModel } from './order.item.model';
import OrderItem from '../../domain/order.item.entity';

jest.mock('./order.item.model', () => ({
  OrderItemModel: {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

const mockOrderItem = (
  id: string,
  orderId: string,
  price: number,
  quantity: number
): OrderItem => {
  return new OrderItem({
    id: id, // Usando string diretamente
    orderId: orderId,
    productId: `prod-${id}`,
    productName: `Product ${id}`,
    price: price,
    quantity: quantity,
    subtotal: price * quantity,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

describe('OrderItemRepository Unit Tests', () => {
  let repository: OrderItemRepository;
  const OrderItemModelMock = OrderItemModel as jest.Mocked<typeof OrderItemModel>;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new OrderItemRepository();
  });

  describe('save', () => {
    it('should save an OrderItem successfully', async () => {
      const itemToSave = mockOrderItem(
        '12345',
        'order-abc',
        100.00,
        2
      );

      await repository.save(itemToSave);

      expect(OrderItemModelMock.create).toHaveBeenCalledTimes(1);
      expect(OrderItemModelMock.create).toHaveBeenCalledWith({
        id: itemToSave.id,
        orderId: itemToSave.orderId,
        productId: itemToSave.productId,
        price: itemToSave.price,
        quantity: itemToSave.quantity,
        subtotal: itemToSave.subtotal,
        createdAt: itemToSave.createdAt,
        updatedAt: itemToSave.updatedAt,
      });
    });
  });

  describe('find', () => {
    const itemId = 'item-found-1';

    const mockModelResult = {
      id: itemId,
      orderId: 'order-1',
      productId: 'prod-1',
      productName: 'Mock Product',
      price: 50.00,
      quantity: 3,
      subtotal: 150.00,
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
    };

    it('should find an OrderItem by id', async () => {
      OrderItemModelMock.findOne.mockResolvedValue(mockModelResult as any);

      const result = await repository.find(itemId);

      expect(OrderItemModelMock.findOne).toHaveBeenCalledWith({ where: { id: itemId } });
      expect(result).toBeInstanceOf(OrderItem);
      expect(result.id).toBe(itemId);
      expect(result.subtotal).toBe(150.00);
      expect(result.quantity).toBe(3);
    });

    it('should throw an error if OrderItem is not found', async () => {
      OrderItemModelMock.findOne.mockResolvedValue(null);

      await expect(repository.find(itemId)).rejects.toThrow('Order not found');
    });
  });

  describe('findAll', () => {
    it('should return a list of OrderItems', async () => {
      const item1 = { id: 'a1', orderId: 'o1', productId: 'p1', productName: 'N1', price: 10, quantity: 1, subtotal: 10, createdAt: new Date(), updatedAt: new Date() };
      const item2 = { id: 'a2', orderId: 'o1', productId: 'p2', productName: 'N2', price: 20, quantity: 2, subtotal: 40, createdAt: new Date(), updatedAt: new Date() };

      OrderItemModelMock.findAll.mockResolvedValue([item1, item2] as any);

      const result = await repository.findAll();

      expect(OrderItemModelMock.findAll).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(OrderItem);
      expect(result[0].id).toBe('a1');
      expect(result[1].price).toBe(20);
    });

    it('should return an empty array if no OrderItems are found', async () => {
      OrderItemModelMock.findAll.mockResolvedValue([]);

      const result = await repository.findAll();

      expect(OrderItemModelMock.findAll).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(0);
    });
  });
});