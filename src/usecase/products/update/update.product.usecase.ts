import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputProductUpdateDto, OutputProductUpdateDto } from "./update.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputProductUpdateDto): Promise<OutputProductUpdateDto> {
        const product = await this.productRepository.find(input.id);

        console.log('input.name: ' + input.name);
        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }

}