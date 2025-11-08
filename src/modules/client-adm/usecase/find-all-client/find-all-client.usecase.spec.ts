import Address from '../../../@shared/domain/value-object/address';
import Client from '../../domain/client.entity';
import ClientRepository from '../../repository/client.repository';
import FindAllClientUseCase from './find-all-client.usecase';

const client = [
  new Client({
    id: '1',
    name: 'Lucian',
    email: 'lucian@123.com',
    document: '1234-5678',
    address: new Address(
      'Rua 123',
      '99',
      'Casa Verde',
      'Criciúma',
      'SC',
      '88888-888',
    )
  }),
  new Client({
    id: '2',
    name: 'Daniel',
    email: 'daniel@123.com',
    document: '1234-5678',
    address: new Address(
      'Rua 883',
      '45',
      'Casa Verde',
      'Criciúma',
      'SC',
      '88888-888',
    )
  })
];

const MockRepository = (): ClientRepository => {
  return {
    add: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe('Find Client use case unit test', () => {

  it('should find a client', async () => {

    const repository = MockRepository();
    const usecase = new FindAllClientUseCase(repository);

    const result = await usecase.execute();

    expect(repository.findAll).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});