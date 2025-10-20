import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import CheckoutFacadeInterface, { CheckoutInputDto, CheckoutOutputDto } from './checkout.interface';

export interface UseCaseProps {
  checkoutUsercase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {

  private _checkoutUsercase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._checkoutUsercase = usecaseProps.checkoutUsercase;
  }

  async checkout(input: CheckoutInputDto): Promise<CheckoutOutputDto> {
    return await this._checkoutUsercase.execute(input);
  }

}
