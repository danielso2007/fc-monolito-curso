import InvoiceItems from 'modules/invoice/domain/invoice.itens.entity';
import Address from '../../../@shared/domain/value-object/address';

export interface FindInvoiceUseCaseInputDTO {
  id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt: Date;
  updatedAt: Date;
}