import { Router } from 'express';
import checkoutFacadeFactory from '../factory/checkout.facade.factory';
import { CheckoutPresenter } from './checkout.presenter';

const checkoutController = Router();

checkoutController.post('/', async (req, res) => {
    const useCase = checkoutFacadeFactory.create();
    const checkout = await useCase.checkout(req.body);
    res.status(201).json(CheckoutPresenter.toJSON(checkout));
});

export default checkoutController;
