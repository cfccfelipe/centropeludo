import { InputType, Field } from "type-graphql";

@InputType()
export class ProductInputId {
  @Field(() => Number)
  _id!: number;
}
@InputType()
export class ProductInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => Number)
  price!: number;
}

@InputType()
export class ProductUpdateInput {
  @Field(() => Number)
  _id!: number;
  @Field(() => Number)
  price!: number;
}
