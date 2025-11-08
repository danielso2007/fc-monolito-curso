import CheckoutFacade from './checkout.facade';
import { CheckoutInputDto, CheckoutOutputDto } from './checkout.interface';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import Address from '../../@shared/domain/value-object/address';

const MockCheckoutUseCase = (): UseCaseInterface => {
  return {
    execute: jest.fn(),
  };
};

describe('CheckoutFacade Unit Test', () => {
  let checkoutUseCase: jest.Mocked<UseCaseInterface>;
  let facade: CheckoutFacade;
  const mockAddress = new Address(
    'Rua Teste',
    '123',
    'Apto 1',
    'Cidade Teste',
    'ST',
    '00000-000'
  );

  const input: CheckoutInputDto = {
    clientId: 'client-abc-123',
    totalAmount: 500.00,
    billingAddress: mockAddress,
    shippingAddress: mockAddress,
    paymentMethod: 'Pix',
    items: [
      { productId: 'prod-a', productName: 'Item A', price: 250.00, quantity: 1 },
      { productId: 'prod-b', productName: 'Item B', price: 125.00, quantity: 2 },
    ],
  };

  const output: CheckoutOutputDto = {
    id: 'order-xyz-789',
    clientId: input.clientId,
    invoiceId: 'inv-123',
    status: 'PAGO',
    totalAmount: input.totalAmount,
    billingAddress: input.billingAddress,
    shippingAddress: input.shippingAddress,
    paymentMethod: input.paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'item-1',
        orderId: 'order-xyz-789',
        productId: 'prod-a',
        productName: 'Item A',
        price: 250.00,
        quantity: 1,
        subtotal: 250.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  // -----------------------

  beforeEach(() => {
    checkoutUseCase = MockCheckoutUseCase() as jest.Mocked<UseCaseInterface>;
    facade = new CheckoutFacade({ checkoutUsercase: checkoutUseCase });
  });

  it('should call the checkout use case with correct input and return its output', async () => {
    checkoutUseCase.execute.mockResolvedValue(output);

    const result = await facade.checkout(input);

    expect(checkoutUseCase.execute).toHaveBeenCalledTimes(1);

    expect(checkoutUseCase.execute).toHaveBeenCalledWith(input);

    expect(result).toEqual(output);
    expect(result.id).toBe('order-xyz-789');
    expect(result.status).toBe('PAGO');
  });
});