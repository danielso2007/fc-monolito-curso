
import Address from '../../../@shared/domain/value-object/address';
import InvoiceGateway from '../../gateway/invoice.gateway';
import { FindAllInvoiceUseCaseOutputDTO } from './find-all-invoice.usecase.dto';
import UseCaseSimpleExecuteInterface from '../../../@shared/usecase/use-case.simple.execute.interface';

export default class FindAllInvoiceUseCase implements UseCaseSimpleExecuteInterface {

  private _repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this._repository = repository;
  }

  async execute(): Promise<FindAllInvoiceUseCaseOutputDTO[]> {

    const result = await this._repository.findAll();

    return result.map((input) => ({
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
    }));
  }
}