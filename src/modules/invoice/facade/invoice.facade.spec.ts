import { Sequelize } from 'sequelize-typescript';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import InvoiceModel from '../repository/invoice.model';
import InvoiceItems from '../domain/invoice.itens.entity';
import InvoiceItemModel from '../repository/invoice.itens.model';
import Address from '../../@shared/domain/value-object/address';
import InvoiceRepostiory from '../repository/invoice.repository';
import Invoice from '../domain/invoice.entity';

describe('InvoiceFacade Integration Test', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and retrieve an invoice', async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = new Invoice({
      id: '1',
      name: 'Daniel',
      document: '11459-9665',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888'
      ),
      items: [
        new InvoiceItems({
          id: '1',
          name: 'Produto 1',
          price: 12.99,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const invoice = new Invoice(input);

    const repository = new InvoiceRepostiory();
    await repository.save(invoice);

    const output = await facade.find({ id: '1' });

    expect(output).toBeDefined();
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.address.city).toBe(input.address.city);
    expect(output.items.length).toBe(1);
    expect(output.items[0].price).toBe(input.items[0].price);
  });
});
