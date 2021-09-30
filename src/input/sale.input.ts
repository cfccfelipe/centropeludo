import { InputType, Field } from "type-graphql";

@InputType()
export class SaleInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => Number)
  pet_id!: number;

  @Field(() => Number)
  product_code!: number;

  @Field(() => Number)
  price!: number;

  @Field(() => Number)
  quantity!: number;
}

@InputType()
export class SaleInputId {
  @Field(() => Number)
  _id!: number;
}
@InputType()
export class SaleUpdateInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => Number)
  pet_id!: number;
}
