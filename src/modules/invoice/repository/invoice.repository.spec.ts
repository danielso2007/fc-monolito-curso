import { Sequelize } from 'sequelize-typescript';
import invoiceModel from './invoice.model';
import invoiceRepostiory from './invoice.repository';
import Invoice from '../domain/invoice.entity';
import Address from '../../@shared/domain/value-object/address';
import InvoiceItems from '../domain/invoice.itens.entity';
import InvoiceItemModel from './invoice.itens.model';

describe('invoiceRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([invoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should save a invoice', async () => {
    const invoice = new Invoice({
      id: '1',
      name: 'Daniel',
      document: '11459-9665',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888',
      ),
      items: [new InvoiceItems({
        id: "1",
        name: "Daniel",
        price: 12.99
      })]
    });

    const repository = new invoiceRepostiory();

    await repository.save(invoice);

    const result = await repository.find("1");

    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe('Daniel');
  });
});
