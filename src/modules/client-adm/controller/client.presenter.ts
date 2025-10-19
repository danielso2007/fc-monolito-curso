import { FindClientFacadeOutputDto } from "../facade/client-adm.facade.interface";

export class ClientPresenter {
    static toJSON(entity: FindClientFacadeOutputDto): any {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            document: entity.document,
            address: {
                street: entity.address.street,
                number: entity.address.number,
                complement: entity.address.complement,
                city: entity.address.city,
                state: entity.address.state,
                zipCode: entity.address.zipCode,
            },
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static toJSONArray(entities: FindClientFacadeOutputDto[]): any {
        return entities.map((entity) => this.toJSON(entity));
    }
}
