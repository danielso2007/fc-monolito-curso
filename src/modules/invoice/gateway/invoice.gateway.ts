import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice.itens.entity";

export default interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  save(input: Invoice): Promise<Invoice>;
  findItens(id: string): Promise<InvoiceItems[]>;
  findAll(): Promise<Invoice[]>;
};
