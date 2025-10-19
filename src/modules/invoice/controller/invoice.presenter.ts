import { FindAllInvoiceOutputDTO, GenerateInvoiceOutputDto } from "../facade/invoice.interface";

export class InvoicePresenter {
    static toJSON(entity: FindAllInvoiceOutputDTO): any {

        const items = entity.items.map((value) => ({
            id: value.id,
            createdAt: value.createdAt,
            updatedAt: value.updatedAt,
            name: value.name,
            price: value.price
        }));

        return {
            id: entity.id,
            name: entity.name,
            document: entity.document,
            address: {
                street: entity.address.street,
                number: entity.address.number,
                complement: entity.address.complement,
                city: entity.address.city,
                state: entity.address.state,
                zipCode: entity.address.zipCode,
            },
            items: items,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }

    static toJSONArray(entities: FindAllInvoiceOutputDTO[]): any {
        return entities.map((entity) => this.toJSON(entity));
    }

    static toJSONArrayGenerate(entity: GenerateInvoiceOutputDto): any {
        const items = entity.items.map((value) => ({
            id: value.id,
            name: value.name,
            price: value.price
        }));
        return {
            id: entity.id,
            name: entity.name,
            document: entity.document,
            street: entity.street,
            number: entity.number,
            complement: entity.complement,
            city: entity.city,
            state: entity.state,
            zipCode: entity.state,
            items: items,
            total: entity.total
        };
    }
}
