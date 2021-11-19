import { InputType, Field } from 'type-graphql';
import { Pet } from '../entity/pet.entity';

@InputType()
export class PetInputId {
	@Field(() => String)
	_id!: string;
}
@InputType()
export class FindCustomerInputID {
	@Field(() => Number)
	customerid!: number;
}
@InputType()
export class PetInput {
	@Field(() => String)
	pet_name!: string;

	@Field(() => String)
	pet_group!: string;

	@Field(() => String)
	pet_gender!: string;

	@Field(() => Number)
	customer_id!: number;
}

@InputType()
export class PetUpdateInput {
	@Field(() => String)
	_id!: string;

	@Field(() => String, { nullable: true })
	pet_name?: string;

	@Field(() => Number, { nullable: true })
	customer?: number;
}
