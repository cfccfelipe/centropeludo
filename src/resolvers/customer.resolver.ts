import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Customer } from '../entity/customer.entity';
import {
	FindAndModifyWriteOpResultObject,
	Repository,
	getRepository
} from 'typeorm';
import {
	CustomerInput,
	CustomerInputID,
	CustomerUpdateInput
} from '../input/customer.input';

@Resolver()
export class CustomerResolver {
	customerRepository: Repository<Customer>;
	constructor() {
		this.customerRepository = getRepository(Customer);
	}

	@Query(() => [Customer])
	async getAllCustomers(): Promise<Customer[] | undefined> {
		return await this.customerRepository.find();
	}

	@Query(() => Customer)
	async getOneCustomerById(
		@Arg('input', () => CustomerInputID) input: CustomerInputID
	): Promise<Customer | undefined> {
		return await this.customerRepository.findOne({ _id: input._id });
	}

	@Mutation(() => Customer)
	async createCustomer(
		@Arg('input', () => CustomerInput) input: CustomerInput
	): Promise<Customer | undefined> {
		try {
			const exist = await this.customerRepository.findOne({ _id: input._id });
			if (exist) {
				throw new Error('El cliente ya existe');
			}
			const dateToday = new Date().getTime();
			const createdCustomer = await this.customerRepository.create({
				_id: input._id,
				first_name: input.first_name,
				last_name: input.last_name,
				number: input.phone ? input.phone : 0,
				email: input.email ? input.email : 'nodefined@gmail.com',
				createdAt: dateToday
			});
			await this.customerRepository.save(createdCustomer);
			const result = await this.customerRepository.findOne(createdCustomer);
			return result;
		} catch (e) {
			console.error(e);
		}
	}

	@Mutation(() => Customer)
	async updateCustomerEmailById(
		@Arg('input', () => CustomerUpdateInput) input: CustomerUpdateInput
	): Promise<Customer | undefined> {
		const customerValidator = await this.customerRepository.findOne({
			_id: input._id
		});
		if (!customerValidator) {
			throw new Error('El cliente no esta creado');
		}
		await this.customerRepository.update(customerValidator, {
			email: input.email
		});
		const customerUpdated = await this.customerRepository.findOne({
			_id: input._id
		});
		return customerUpdated;
	}
	@Mutation(() => Customer)
	async updateCustomerNumberById(
		@Arg('input', () => CustomerUpdateInput) input: CustomerUpdateInput
	): Promise<Customer | undefined> {
		const customerValidator = await this.customerRepository.findOne(input._id);
		if (!customerValidator) {
			throw new Error('El cliente no esta creado');
		}
		await this.customerRepository.update(customerValidator, {
			number: input.number
		});
		const customerUpdated = await this.customerRepository.findOne(input._id);
		return customerUpdated;
	}
	@Mutation(() => Boolean)
	async deleteOneCustomerById(
		@Arg('input', () => CustomerInputID) input: CustomerInputID
	): Promise<Boolean> {
		await this.customerRepository.delete({ _id: input._id });
		return true;
	}
}
