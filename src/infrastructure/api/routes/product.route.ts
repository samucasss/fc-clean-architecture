import express, { Request, Response } from "express";
import ListProductUseCase from "../../../usecase/products/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/products/create/create.product.usecase";
import { InputProductCreateDto } from "../../../usecase/products/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto: InputProductCreateDto = {
      name: req.body.name,
      price: req.body.price
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
  });
});
