import { Entity, Column } from 'typeorm';
import { Customer } from './customer.entity';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Pet {
	@Field(() => String)
	@ObjectIdColumn({ nullable: true })
	_id!: string;

	@Field(() => String)
	@Column({ nullable: true })
	pet_name!: string;

	@Field(() => String)
	@Column({ nullable: true })
	pet_group!: string;

	@Field(() => String)
	@Column({ nullable: true })
	pet_gender!: string;

	@Field()
	@Column()
	customer!: Number;

	@Field(() => Date)
	@Column({ nullable: true })
	createdAt?: Date;
}
