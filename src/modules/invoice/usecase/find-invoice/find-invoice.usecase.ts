import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoicetUseCase implements UseCaseInterface {

  private _invoiceRepository: InvoiceGateway;

  constructor(InvoiceRepository: InvoiceGateway) {
    this._invoiceRepository = InvoiceRepository;
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

    const invoice = await this._invoiceRepository.find(input.id);

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    };
  }
}