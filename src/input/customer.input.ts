import { Field, InputType } from "type-graphql";

@InputType()
export class CustomerInputID {
  @Field(() => Number)
  _id!: number;
}

@InputType()
export class CustomerInput {
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
export class CustomerUpdateInput {
  @Field(() => Number)
  _id!: number;

  @Field(() => Number)
  number?: number;

  @Field()
  email?: string;
}
