import Address from "../../../@shared/domain/value-object/address";
import FindAllInvoiceUseCase from "./find-all-invoice.usecase";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice.itens.entity";

describe("FindAllInvoiceUseCase Unit Test", () => {
  it("should return all invoices correctly", async () => {
    const address = new Address(
      "Rua das Flores",
      "123",
      "Apto 45",
      "São Paulo",
      "SP",
      "01234-567"
    );

    const item1 = new InvoiceItems({
      id: "1",
      name: "Item A",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const item2 = new InvoiceItems({
      id: "2",
      name: "Item B",
      price: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const invoice = new Invoice({
      id: "inv-1",
      name: "Fatura 001",
      document: "12345678900",
      address,
      items: [item1, item2],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockRepository: InvoiceGateway = {
      find: jest.fn(),
      findAll: jest.fn().mockResolvedValue([invoice]),
      findItens: jest.fn(),
      save: jest.fn()
    };

    const useCase = new FindAllInvoiceUseCase(mockRepository);

    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);

    const output = result[0];
    expect(output.id).toBe(invoice.id);
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.address).toBeInstanceOf(Address);
    expect(output.address.street).toBe(address.street);
    expect(output.items).toHaveLength(2);
    expect(output.items[0].name).toBe("Item A");
    expect(output.items[1].price).toBe(200);
    expect(output.createdAt).toBe(invoice.createdAt);
    expect(output.updatedAt).toBe(invoice.updatedAt);
  });
});
