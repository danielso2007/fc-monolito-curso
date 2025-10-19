
import InvoiceGateway from "../../../invoice/gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";
import Invoice from "../../../invoice/domain/invoice.entity";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../../invoice/domain/invoice.itens.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const items = input.items.map((item) => new InvoiceItems(
            { id: item.id, name: item.name, price: item.price }
        ));

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode
            ),
            items: items
        });

        let saveObjet = await this._invoiceRepository.save(invoice);

        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

        return {
            id: saveObjet.id,
            name: saveObjet.name,
            document: saveObjet.document,
            street: saveObjet.address.street,
            number: saveObjet.address.number,
            complement: saveObjet.address.complement,
            city: saveObjet.address.city,
            state: saveObjet.address.state,
            zipCode: saveObjet.address.zipCode,
            items: saveObjet.items,
            total: totalPrice
        };
    }
}