import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";

import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Customer {
  @Field(() => Number)
  @ObjectIdColumn()
  _id!: number;

  @Field(() => String)
  @Column()
  first_name!: string;

  @Field(() => String)
  @Column()
  last_name!: string;

  @Field(() => String)
  @Column({ nullable: true })
  number?: number;

  @Field(() => String)
  @Column({ nullable: true })
  email?: string;

  @Field()
  @CreateDateColumn()
  createdAt!: number;
}
