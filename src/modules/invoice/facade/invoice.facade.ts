import UseCaseSimpleExecuteInterface from '../../@shared/usecase/use-case.simple.execute.interface';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import InvoiceFacadeInterface, { FindAllInvoiceOutputDTO, FindInvoiceInputDTO, FindInvoiceOutputDTO, GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from './invoice.interface';

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
  findAllUseCase: UseCaseSimpleExecuteInterface;
}


export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;
  private _findAllUseCase: UseCaseSimpleExecuteInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUsecase = usecaseProps.generateUsecase;
    this._findAllUseCase = usecaseProps.findAllUseCase;
  }


  async find(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO> {
    return await this._findUsecase.execute(input);
  }

  async generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
    return await this._generateUsecase.execute(input);
  }

  async findAll(): Promise<FindAllInvoiceOutputDTO[]> {
    return await this._findAllUseCase.execute();
  }
}
