import { InputType, Field } from "type-graphql";

@InputType()
export class PetInputId {
  @Field(() => Number)
  _id!: number;
}

@InputType()
export class PetInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => String)
  pet_name!: string;

  @Field(() => String)
  pet_group!: string;

  @Field(() => String)
  pet_gender!: string;

  @Field()
  customer_id!: number;
}

@InputType()
export class PetUpdateInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => String)
  pet_name!: string;
}
