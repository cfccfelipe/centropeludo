import { Entity, Column, CreateDateColumn } from "typeorm";

import { Field, ObjectType } from "type-graphql";
import { ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Pet {
  @Field()
  @ObjectIdColumn()
  _id!: number;

  @Field(() => String)
  @Column()
  pet_name!: string;

  @Field(() => String)
  @Column()
  pet_group!: string;

  @Field(() => String)
  @Column()
  pet_gender!: string;

  @Field()
  @Column()
  customer_id!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: number;
}
