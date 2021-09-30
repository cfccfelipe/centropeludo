import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Sale {
  @Field()
  @ObjectIdColumn()
  _id!: number;

  @Field()
  @Column()
  pet_id!: number;

  @Field()
  @Column()
  product_code!: number;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  quantity!: number;

  @Field()
  @Column()
  total!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: number;
}
