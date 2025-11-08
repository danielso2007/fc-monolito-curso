import OrderRepository from './order.repository';
import { OrderModel } from './order.model';
import Order from '../../domain/order.entity';
import { OrderStatus } from '../../domain/order.status';
import Address from '../../../@shared/domain/value-object/address';

jest.mock('./order.model', () => ({
    OrderModel: {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
    },
}));

const mockAddress = new Address('Rua A', '100', 'Bloco X', 'City Y', 'ST', '12345-678');

const mockOrder = (id: string): Order => {
    return new Order({
        id: id,
        clientId: `client-${id}`,
        invoiceId: `invoice-${id}`,
        status: OrderStatus.PAGO,
        totalAmount: 500.00,
        billingAddress: mockAddress,
        shippingAddress: mockAddress,
        paymentMethod: 'credit_card',
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

describe('OrderRepository Unit Tests', () => {
    let repository: OrderRepository;
    const OrderModelMock = OrderModel as jest.Mocked<typeof OrderModel>;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new OrderRepository();
    });

    describe('save', () => {
        it('should save an Order and map Address fields correctly to flat model', async () => {
            const orderToSave = mockOrder('save-1');

            const result = await repository.save(orderToSave);

            expect(OrderModelMock.create).toHaveBeenCalledTimes(1);

            const createCallArgs = OrderModelMock.create.mock.calls[0][0];

            expect(createCallArgs.id).toBe(orderToSave.id);
            expect(createCallArgs.status).toBe(OrderStatus.PAGO);
            expect(createCallArgs.totalAmount).toBe(500.00);

            // Verifica o mapeamento do billingAddress (Achatamento)
            expect(createCallArgs.billingAddressStreet).toBe(mockAddress.street);
            expect(createCallArgs.billingAddressNumber).toBe(mockAddress.number);
            expect(createCallArgs.billingAddressZipcode).toBe(mockAddress.zipCode);

            // Verifica o mapeamento do shippingAddress (Achatamento)
            expect(createCallArgs.shippingAddressCity).toBe(mockAddress.city);

            // Verifica o retorno (deve ser uma nova entidade Order)
            expect(result).toBeInstanceOf(Order);
            expect(result.id).toBe(orderToSave.id);
            expect(result.shippingAddress).toBeInstanceOf(Address);
            expect(result.shippingAddress.zipCode).toBe(mockAddress.zipCode);
        });
    });

    describe('find', () => {
        const orderId = 'find-2';
        const createdAt = new Date('2025-01-01');
        const updatedAt = new Date('2025-01-02');

        const mockModelResult = {
            id: orderId,
            clientId: `client-${orderId}`,
            invoiceId: `invoice-${orderId}`,
            status: OrderStatus.ENVIADO,
            totalAmount: 125.75,
            billingAddressStreet: 'Find St',
            billingAddressNumber: '99',
            billingAddressComplement: 'Ap 1',
            billingAddressCity: 'Find City',
            billingAddressState: 'FS',
            billingAddressZipcode: '11111-111',
            shippingAddressStreet: 'Ship St',
            shippingAddressNumber: '100',
            shippingAddressComplement: '',
            shippingAddressCity: 'Ship City',
            shippingAddressState: 'SS',
            shippingAddressZipcode: '22222-222',
            paymentMethod: 'boleto',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        it('should find an Order and reconstruct Address value objects', async () => {
            OrderModelMock.findOne.mockResolvedValue(mockModelResult as any);

            const result = await repository.find(orderId);

            expect(OrderModelMock.findOne).toHaveBeenCalledWith({ where: { id: orderId } });
            expect(result).toBeInstanceOf(Order);
            expect(result.totalAmount).toBe(125.75);
            expect(result.status).toBe(OrderStatus.ENVIADO);

            // Verifica a reconstrução do billingAddress
            expect(result.billingAddress).toBeInstanceOf(Address);
            expect(result.billingAddress.street).toBe('Find St');
            expect(result.billingAddress.zipCode).toBe('11111-111');

            // Verifica a reconstrução do shippingAddress
            expect(result.shippingAddress).toBeInstanceOf(Address);
            expect(result.shippingAddress.street).toBe('Ship St');
            expect(result.shippingAddress.city).toBe('Ship City');
            expect(result.createdAt).toEqual(createdAt);
        });

        it('should throw an error if Order is not found', async () => {
            OrderModelMock.findOne.mockResolvedValue(null);
            await expect(repository.find(orderId)).rejects.toThrow('Order not found');
        });
    });

    describe('findAll', () => {
        const orderId = 'find-2';
        const createdAt = new Date('2025-01-01');
        const updatedAt = new Date('2025-01-02');

        const mockModelResult = {
            id: orderId,
            clientId: `client-${orderId}`,
            invoiceId: `invoice-${orderId}`,
            status: OrderStatus.ENVIADO,
            totalAmount: 125.75,
            billingAddressStreet: 'Find St',
            billingAddressNumber: '99',
            billingAddressComplement: 'Ap 1',
            billingAddressCity: 'Find City',
            billingAddressState: 'FS',
            billingAddressZipcode: '11111-111',
            shippingAddressStreet: 'Ship St',
            shippingAddressNumber: '100',
            shippingAddressComplement: '',
            shippingAddressCity: 'Ship City',
            shippingAddressState: 'SS',
            shippingAddressZipcode: '22222-222',
            paymentMethod: 'boleto',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        it('should return a list of Orders and reconstruct Addresses', async () => {
            const order1 = { ...mockModelResult, id: 'a1', totalAmount: 10.00 };
            const order2 = { ...mockModelResult, id: 'a2', totalAmount: 20.00 };

            OrderModelMock.findAll.mockResolvedValue([order1, order2] as any);

            const result = await repository.findAll();

            expect(OrderModelMock.findAll).toHaveBeenCalledTimes(1);
            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(Order);
            expect(result[0].id).toBe('a1');
            expect(result[1].totalAmount).toBe(20.00);

            // Verifica a reconstrução do Address no segundo item
            expect(result[1].shippingAddress.street).toBe('Ship St');
        });

        it('should return an empty array if no Orders are found', async () => {
            OrderModelMock.findAll.mockResolvedValue([]);

            const result = await repository.findAll();

            expect(result.length).toBe(0);
        });
    });
});