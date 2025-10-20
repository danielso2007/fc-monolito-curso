import CheckoutFacade from "../facade/checkout.facade";
import CheckoutFacadeInterface from "../facade/checkout.interface";
import CheckoutUseCase from "../usecase/checkout/checkout.usercase";
import OrderRepository from "../repository/order/order.repository";
import OrderItemRepository from "../repository/orderItem/order.item.repository";

export default class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {

    const repositoryOrder = new OrderRepository();
    const repositoryOrderItem = new OrderItemRepository();
    const checkoutUsercase = new CheckoutUseCase(repositoryOrder, repositoryOrderItem);

    const facade = new CheckoutFacade({
      checkoutUsercase: checkoutUsercase
    });

    return facade;
  }
}
