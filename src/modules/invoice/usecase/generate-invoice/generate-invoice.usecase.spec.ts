import Address from '../../../@shared/domain/value-object/address';
import GenerateInvoiceUseCase from './generate-invoice.usecase';
import InvoiceGateway from '../../../invoice/gateway/invoice.gateway';
import InvoiceItems from '../../../invoice/domain/invoice.itens.entity';

const MockRepository = (): InvoiceGateway => {
  return {
    save: jest.fn(),
    find: jest.fn(),
    findItens: jest.fn(),
    findAll: jest.fn()
  };
};

describe('GenerateInvoiceUseCase unit test', () => {
  let repository: InvoiceGateway;
  let usecase: GenerateInvoiceUseCase;

  beforeEach(() => {
    repository = MockRepository();

    repository.save = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Daniel',
      document: '123.456.789-00',
      address: new Address('Rua A', '123', 'Sala 1', 'Criciúma', 'SC', '88888-888'),
      items: [new InvoiceItems({ id: '1', name: 'Produto 1', price: 10 })],
    });

    usecase = new GenerateInvoiceUseCase(repository);
  });

  it('should generate an invoice and calculate total', async () => {
    const input = {
      name: 'Daniel',
      document: '123.456.789-00',
      street: 'Rua A',
      number: '123',
      complement: 'Sala 1',
      city: 'Criciúma',
      state: 'SC',
      zipCode: '88888-888',
      items: [{ id: '1', name: 'Produto 1', price: 10 }],
    };

    const result = await usecase.execute(input);

    expect(repository.save).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.city).toBe(input.city);
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(10); // soma dos itens
  });
});
