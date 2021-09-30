import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product {
  @Field()
  @ObjectIdColumn()
  _id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: number;
}
