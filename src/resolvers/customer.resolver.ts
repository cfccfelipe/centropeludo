import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../entity/customer.entity";
import { createConnection } from "typeorm";
import {
  getRepository,
  Repository,
  getMongoRepository,
  MongoRepository,
  ObjectIdColumn,
  PrimaryColumn,
} from "typeorm";
import { createTracing } from "trace_events";
import { O_SYMLINK } from "constants";

//Crear en otro archivo
@InputType()
class CustomerInputID {
  @Field(() => Number)
  _id!: number;
}

@InputType()
class CustomerInput {
  @Field(() => Number)
  _id!: number;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field(() => Number)
  number?: number;

  @Field()
  email?: string;
}

@InputType()
class CustomerUpdateInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => Number)
  number?: number;

  @Field()
  email?: string;
}

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
  ): Promise<Customer | undefined> {
    const customerValidator = await this.customerRepository.findOne({
      _id: input._id,
    });
    if (!customerValidator) {
      throw new Error("El cliente no esta creado");
    }
    // const updatedCustomer = await this.customerRepository.updateOne(input, {
    return await this.customerRepository.save({
      _id: input._id,
      number: input.number,
      email: input.email,
    });
    // return await this.customerRepository.findOne(updatedCustomer._id);
  }
}
