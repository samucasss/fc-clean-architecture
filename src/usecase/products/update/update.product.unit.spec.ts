import { InputProductUpdateDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create('a', "Product 1", 10);

const input: InputProductUpdateDto = {
    id: product.id,
    name: "Product 1 updated",
    price: 20,
};

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
      const productRepository = MockRepository();
      const productUpdateUseCase = new UpdateProductUseCase(productRepository);
  
      const output = await productUpdateUseCase.execute(input);
  
      expect(output).toEqual({
        id: expect.any(String),
        name: input.name,
        price: input.price
      });
    });
  
    it("should thrown an error when name is missing", async () => {
      const productRepository = MockRepository();
      const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    
      input.name = "";
  
      await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
        "Name is required"
      );
    });
  
    it("should thrown an error when price not is greater than zero", async () => {
      const productRepository = MockRepository();
      const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    
      input.name = 'Product 1 updated';  
      input.price = -1;
  
      await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
        "Price must be greater than zero"
      );
    });
  });
  
