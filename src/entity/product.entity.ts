import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Product {
	@Field(() => Number)
	@ObjectIdColumn()
	_id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => Number)
	@Column()
	price!: number;

	@Field(() => Number)
	@CreateDateColumn()
	createdAt!: number;
}
