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

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp", default: Date.now })
  createdAt!: string;
}
