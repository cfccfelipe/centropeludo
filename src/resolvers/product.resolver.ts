import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  MongoRepository,
  getMongoRepository,
  FindAndModifyWriteOpResultObject,
} from "typeorm";
import { Product } from "../entity/product.entity";
import {
  ProductInputId,
  ProductInput,
  ProductUpdateInput,
} from "../input/product.input";

@Resolver()
export class ProductResolver {
  productRepository: MongoRepository<Product>;
  constructor() {
    this.productRepository = getMongoRepository(Product);
  }

  @Query(() => Product)
  async getOneProductById(
    @Arg("input", () => ProductInputId) input: ProductInputId
  ): Promise<Product | undefined> {
    return await this.productRepository.findOne({ _id: input._id });
  }
  @Query(() => [Product])
  async getAllProducts(): Promise<Product[] | undefined> {
    return await this.productRepository.find();
  }
  @Mutation(() => Product)
  async createOneProduct(
    @Arg("input", () => ProductInput) input: ProductInput
  ): Promise<Product | undefined> {
    try {
      const productCreated = await this.productRepository.insert({
        _id: input._id,
        name: input.name,
        price: input.price,
        createdAt: Date.now(),
      });
      try {
        const result = await this.productRepository.findOne(
          productCreated.identifiers[0]
        );
        return result;
      } catch {
        throw new Error("El producto ya esta creado");
      }
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => Product)
  async updateProductById(
    @Arg("input", () => ProductUpdateInput) input: ProductUpdateInput
  ): Promise<FindAndModifyWriteOpResultObject | undefined> {
    try {
      const productValidator = await this.productRepository.findOne({
        _id: input._id,
      });
      if (!productValidator) {
        throw new Error("El producto no fue encontrado");
      }
      return await this.productRepository.findOneAndUpdate(productValidator, {
        $set: {
          price: input.price,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => Boolean)
  async deleteProductById(
    @Arg("input", () => ProductInputId) input: ProductInputId
  ): Promise<Boolean> {
    await this.productRepository.deleteOne({ _id: input._id });
    return true;
  }
}
