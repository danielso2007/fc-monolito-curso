import TransactionRepostiory from 'modules/payment/repository/transaction.repository';
import Transaction from '../../domain/transaction';
import ProcessPaymentUseCase from './process-payment.usecase';

const transaction = new Transaction({
  id: '1',
  amount: 100,
  orderId: '1',
  status: 'approved',
});

const MockRepository = (): TransactionRepostiory => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

const transaction2 = new Transaction({
  id: '1',
  amount: 50,
  orderId: '1',
  status: 'declined',
});

const MockRepositoryDeclined = (): TransactionRepostiory => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  };
};

describe('Process payment usecase unit test', () => {
  it('should approve a transaction', async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: '1',
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(transaction.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe('1');
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: '1',
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(transaction2.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe('declined');
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe('1');
    expect(result.createdAt).toBe(transaction2.createdAt);
    expect(result.updatedAt).toBe(transaction2.updatedAt);
  });
});
