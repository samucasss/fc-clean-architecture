import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "../update/update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product integration use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should update a product", async () => {
      const productRepository = new ProductRepository();

      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      const usecase = new UpdateProductUseCase(productRepository);
  
      const input = {
        id: product.id,
        name: "Product 1 updated",
        price: 20,
      }

      const result = await usecase.execute(input);
  
      expect(result.id).toEqual(product.id);
      expect(result.name).toEqual(input.name);
      expect(result.price).toEqual(input.price);
    });
  });
  