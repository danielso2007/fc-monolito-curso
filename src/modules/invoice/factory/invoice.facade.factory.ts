import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.interface";
import InvoiceRepostiory from "../repository/invoice.repository";
import FindInvoicetUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepostiory();
    const findInvoicetUseCase = new FindInvoicetUseCase(repository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      findUsecase: findInvoicetUseCase,
      generateUsecase: generateInvoiceUseCase,
    });
    return facade;
  }
}
