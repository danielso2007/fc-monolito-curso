import OrderGateway from '../../gateway/order.gateway';
import OrderItemGateway from '../../gateway/order.item.gateway';
import { CheckoutUseCaseInputDto } from './checkout.usecase.dto';
import Order from '../../domain/order.entity';
import OrderItem from '../../domain/order.item.entity';
import { OrderStatus } from '../../domain/order.status';
import Address from '../../../@shared/domain/value-object/address';
import CheckoutUseCase from './checkout.usercase';

const mockOrderGateway = (): OrderGateway => ({
    save: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
});

const mockOrderItemGateway = (): OrderItemGateway => ({
    save: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
});

describe('CheckoutUseCase Unit Test', () => {
    let repositoryOrder: jest.Mocked<OrderGateway>;
    let repositoryOrderItem: jest.Mocked<OrderItemGateway>;
    let useCase: CheckoutUseCase;

    const orderIdMock = 'order-abc-123';
    const mockDate = new Date();

    const mockAddress = new Address(
        'Rua Teste',
        '123',
        'Apto 1',
        'Cidade Teste',
        'ST',
        '00000-000'
    );

    const input: CheckoutUseCaseInputDto = {
        clientId: 'client-xyz-789',
        invoiceId: 'inv-123',
        totalAmount: 0,
        billingAddress: mockAddress,
        shippingAddress: mockAddress,
        paymentMethod: 'Pix',
        items: [
            { productId: 'prod-a', productName: 'Item A', price: 100.00, quantity: 2 },
            { productId: 'prod-b', productName: 'Item B', price: 50.50, quantity: 3 },
        ],
    };

    const expectedTotalAmount = (100.00 * 2) + (50.50 * 3); // 200 + 151.5 = 351.5

    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(mockDate);
        repositoryOrder = mockOrderGateway() as jest.Mocked<OrderGateway>;
        repositoryOrderItem = mockOrderItemGateway() as jest.Mocked<OrderItemGateway>;
        useCase = new CheckoutUseCase(repositoryOrder, repositoryOrderItem);

        repositoryOrder.save.mockImplementation(async (order: Order) => {
            return order;
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should create an Order, calculate amount, and save order items', async () => {
        const result = await useCase.execute(input);

        expect(repositoryOrder.save).toHaveBeenCalledTimes(1);

        // Testa se o objeto Order foi criado corretamente antes de salvar
        const orderToSave = repositoryOrder.save.mock.calls[0][0];
        expect(orderToSave).toBeInstanceOf(Order);
        expect(orderToSave.clientId).toBe(input.clientId);
        expect(orderToSave.totalAmount).toBe(expectedTotalAmount);
        expect(orderToSave.status).toBe(OrderStatus.EM_PROCESSAMENTO);
        expect(orderToSave.items.length).toBe(2);

        // Testa as chamadas para salvar Order Items
        expect(repositoryOrderItem.save).toHaveBeenCalledTimes(2);

        // Testa o primeiro item de pedido (que deve ter recebido o orderId)
        const savedItem1 = repositoryOrderItem.save.mock.calls[0][0];
        expect(savedItem1).toBeInstanceOf(OrderItem);
        expect(savedItem1.productId).toBe('prod-a');
        expect(savedItem1.subtotal).toBe(200.00);

        // Testa o segundo item de pedido
        const savedItem2 = repositoryOrderItem.save.mock.calls[1][0];
        expect(savedItem2.productId).toBe('prod-b');
        expect(savedItem2.subtotal).toBe(151.50);

        // Testa o Output DTO
        expect(result.totalAmount).toBe(expectedTotalAmount);
        expect(result.status).toBe(OrderStatus.EM_PROCESSAMENTO);
        expect(result.createdAt).toEqual(mockDate);
        expect(result.items.length).toBe(2);
    });

    it('should handle an empty item list by setting totalAmount to zero', async () => {
        const inputEmpty: CheckoutUseCaseInputDto = { ...input, items: [] };

        const result = await useCase.execute(inputEmpty);

        expect(repositoryOrder.save).toHaveBeenCalledTimes(1);

        const orderToSave = repositoryOrder.save.mock.calls[0][0];
        expect(orderToSave.totalAmount).toBe(0);

        expect(repositoryOrderItem.save).not.toHaveBeenCalled();
        expect(result.totalAmount).toBe(0);
        expect(result.items.length).toBe(0);
    });
});