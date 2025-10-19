import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import FindAllClientUseCase from '../usecase/find-all-client/find-all-client.usecase';
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from './client-adm.facade.interface';

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  addUsecase: UseCaseInterface;
  findAllUsecase: FindAllClientUseCase;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;
  private _findAllUsecase: FindAllClientUseCase;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._addUsecase = usecaseProps.addUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }

  async findAll(): Promise<FindClientFacadeOutputDto[]> {
    return await this._findAllUsecase.execute();
  }
}