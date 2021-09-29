import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Pet {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;
}
