import InvoiceRepostiory from 'modules/invoice/repository/invoice.repository';
import Address from '../../../@shared/domain/value-object/address';
import AddInvoiceUseCase from './find-invoice.usecase';

const MockRepository = (): InvoiceRepostiory => {
  return {
    find: jest.fn(),
    findItens: jest.fn(),
    save: jest.fn()
  };
};

describe('Find Invoice use case unit test', () => {
  let repository: InvoiceRepostiory;
  let usecase: AddInvoiceUseCase;

  beforeEach(() => {
    repository = MockRepository();
    repository.find = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Lucian',
      document: '1234-5678',
      address: new Address('Rua 123', '99', 'Casa Verde', 'Criciúma', 'SC', '88888-888'),
      items: [{ id: '1', name: 'item', price: 12.99 }]
    });

    usecase = new AddInvoiceUseCase(repository);
  });

  it('should find an Invoice', async () => {
    const result = await usecase.execute({ id: '1' });

    expect(repository.find).toHaveBeenCalledWith('1');
    expect(result.id).toBe('1');
    expect(result.name).toBe('Lucian');
  });
});