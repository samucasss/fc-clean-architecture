import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputProductCreateDto, OutputProductCreateDto } from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputProductCreateDto): Promise<OutputProductCreateDto> {
        const product = ProductFactory.create('a', input.name, input.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }

}