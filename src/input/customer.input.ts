import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInputID {
	@Field(() => Number)
	_id!: number;
}

@InputType()
export class CustomerInput {
	@Field(() => Number)
	_id!: number;

	@Field(() => String)
	first_name!: string;

	@Field(() => String)
	last_name!: string;

	@Field({ nullable: true })
	phone?: number;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	pets?: number;
}

@InputType()
export class CustomerUpdateInput {
	@Field(() => Number)
	_id!: number;

	@Field(() => Number, { nullable: true })
	number?: number;

	@Field(() => String, { nullable: true })
	email?: string;
}
