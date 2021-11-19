import {
	Entity,
	Column,
	CreateDateColumn,
	ObjectIdColumn,
	OneToMany,
	RelationId,
	JoinColumn
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Pet } from './pet.entity';

@ObjectType()
@Entity()
export class Customer {
	@Field(() => Number)
	@ObjectIdColumn()
	_id!: number;

	@Field(() => String)
	@Column({ nullable: true })
	first_name!: string;

	@Field(() => String)
	@Column({ nullable: true })
	last_name!: string;

	@Field(() => Number)
	@Column({ nullable: true })
	number?: number;

	@Field(() => String)
	@Column({ nullable: true })
	email?: string;

	@Field(() => Date)
	@Column()
	createdAt!: Date;
}
