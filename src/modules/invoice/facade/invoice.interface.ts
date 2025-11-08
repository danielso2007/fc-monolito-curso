import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice.itens.entity";

export interface FindInvoiceInputDTO {
  id: string;
}

export interface FindInvoiceOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export interface GenerateInvoiceInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export interface FindAllInvoiceOutputDTO {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt: Date;
  updatedAt: Date;
}

export default interface InvoiceFacadeInterface {
  find(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO>;
  generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto>;
  findAll(): Promise<FindAllInvoiceOutputDTO[]>;
};

