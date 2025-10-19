import UseCaseInterface from 'modules/@shared/usecase/use-case.interface';
import InvoiceFacadeInterface, { FindInvoiceInputDTO, FindInvoiceOutputDTO, GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from './invoice.interface';

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
}


export default class InvoiceFacade implements InvoiceFacadeInterface {

  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUsecase = usecaseProps.generateUsecase;
  }


  find(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO> {
    return this._findUsecase.execute(input);
  }
  generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
    return this._generateUsecase.execute(input);
  }
}
