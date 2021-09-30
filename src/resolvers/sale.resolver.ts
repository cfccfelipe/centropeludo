import { Arg, Query, Resolver, Mutation } from "type-graphql";
import {
  MongoRepository,
  getMongoRepository,
  FindAndModifyWriteOpResultObject,
} from "typeorm";
import { Sale } from "../entity/sale.entity";
import { SaleInputId, SaleInput, SaleUpdateInput } from "../input/sale.input";

@Resolver()
export class SaleResolver {
  saleRepository: MongoRepository<Sale>;
  constructor() {
    this.saleRepository = getMongoRepository(Sale);
  }

  @Query(() => Sale)
  async getOneSaleById(
    @Arg("input", () => SaleInputId) input: SaleInputId
  ): Promise<Sale | undefined> {
    return await this.saleRepository.findOne({ _id: input._id });
  }
  @Query(() => [Sale])
  async getAllSales(): Promise<Sale[] | undefined> {
    return await this.saleRepository.find();
  }

  @Mutation(() => Sale)
  async createOneSale(
    @Arg("input", () => SaleInput) input: SaleInput
  ): Promise<Sale | undefined> {
    try {
      const saleCreated = await this.saleRepository.insert({
        _id: input._id,
        pet_id: input.pet_id,
        product_code: input.product_code,
        price: input.price,
        quantity: input.quantity,
        total: input.price * input.quantity,
        createdAt: Date.now(),
      });
      try {
        const result = await this.saleRepository.findOne(
          saleCreated.identifiers[0]
        );
        return result;
      } catch {
        throw new Error("La factura ya existe");
      }
    } catch (e) {
      console.error(e);
    }
  }

  @Mutation(() => Sale)
  async updateOneSale(
    @Arg("input", () => SaleUpdateInput) input: SaleUpdateInput
  ): Promise<FindAndModifyWriteOpResultObject | undefined> {
    const saleValidator = await this.saleRepository.findOne({ _id: input._id });
    if (!saleValidator) {
      throw new Error("La venta no existe ");
    }
    return await this.saleRepository.findOneAndUpdate(saleValidator, {
      $set: { pet_id: input.pet_id },
    });
  }

  @Mutation(() => Boolean)
  async deleteOneSaleById(
    @Arg("input", () => SaleInputId) input: SaleInputId
  ): Promise<Boolean> {
    await this.saleRepository.deleteOne({ _id: input._id });
    return true;
  }
}
