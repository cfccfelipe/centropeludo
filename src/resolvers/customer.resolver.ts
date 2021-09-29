import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../entity/customer.entity";
import {
  getMongoRepository,
  MongoRepository,
  FindAndModifyWriteOpResultObject,
} from "typeorm";
import {
  CustomerInput,
  CustomerInputID,
  CustomerUpdateInput,
} from "../input/customer.input";

@Resolver()
export class CustomerResolver {
  customerRepository: MongoRepository<Customer>;
  constructor() {
    this.customerRepository = getMongoRepository(Customer);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Arg("input", () => CustomerInput) input: CustomerInput
  ): Promise<Customer | undefined> {
    try {
      const createdCustomer = await this.customerRepository.insert({
        _id: input._id,
        first_name: input.first_name,
        last_name: input.last_name,
        number: input.number,
        email: input.email,
        createdAt: Date.now(),
      });
      try {
        const result = await this.customerRepository.findOne(
          createdCustomer.identifiers[0]
        );
        return result;
      } catch (e) {
        throw new Error("Cliente creado");
      }
    } catch (e) {
      console.error(e);
    }
  }

  @Query(() => [Customer])
  async getAllCustomers(): Promise<Customer[] | undefined> {
    return await this.customerRepository.find();
  }

  @Query(() => Customer)
  async getOneCustomerById(
    @Arg("input", () => CustomerInputID) input: CustomerInputID
  ): Promise<Customer | undefined> {
    return await this.customerRepository.findOne({ _id: input._id });
  }

  @Mutation(() => Customer)
  async updateOneCustomerById(
    @Arg("input", () => CustomerUpdateInput) input: CustomerUpdateInput
  ): Promise<FindAndModifyWriteOpResultObject | undefined> {
    const customerValidator = await this.customerRepository.findOne({
      _id: input._id,
    });
    if (!customerValidator) {
      throw new Error("El cliente no esta creado");
    }
    return await this.customerRepository.findOneAndUpdate(customerValidator, {
      $set: {
        email: input.email,
        number: input.number,
      },
    });
  }
  @Mutation(() => Boolean)
  async deleteOneCustomerById(
    @Arg("input", () => CustomerInputID) input: CustomerInputID
  ): Promise<Boolean> {
    await this.customerRepository.deleteOne({ _id: input._id });
    return true;
  }
}
