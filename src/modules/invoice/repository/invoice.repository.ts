import Invoice from '../domain/invoice.entity';
import InvoiceGateway from '../gateway/invoice.gateway';
import InvoiceModel from './invoice.model';
import InvoiceItems from '../domain/invoice.itens.entity';
import InvoiceItemModel from './invoice.itens.model';
import Address from '../../@shared/domain/value-object/address';

export default class InvoiceRepostiory implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {
        id: id
      },
    });

    const itens = await this.findItens(id);

    return new Invoice({
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipcode,
      ),
      items: itens,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });
  }

  async findItens(id: string): Promise<InvoiceItems[]> {
    const invoiceItens = await InvoiceItemModel.findAll({
      where: { invoiceId: id },
    });

    return invoiceItens.map(
      (invoiceItem) =>
        new InvoiceItems({
          id: invoiceItem.id,
          name: invoiceItem.name,
          price: invoiceItem.price,
          createdAt: invoiceItem.createdAt,
          updatedAt: invoiceItem.updatedAt

        })
    );
  }

  async save(input: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: input.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipcode: input.address.zipCode,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });

    input.items.map((item) => {
      InvoiceItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        invoiceId: input.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })
    });

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: new Address(
        input.address.street,
        input.address.number,
        input.address.complement,
        input.address.city,
        input.address.state,
        input.address.zipCode
      ),
      items: input.items,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });
  }
}
