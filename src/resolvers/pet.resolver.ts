import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { Equal, getRepository, Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { Pet } from '../entity/pet.entity';
import {
	PetInput,
	PetInputId,
	PetUpdateInput,
	FindCustomerInputID
} from '../input/pet.input';

@Resolver()
export class PetResolver {
	petRepo: Repository<Pet>;
	customerRepo: Repository<Customer>;
	constructor() {
		this.petRepo = getRepository(Pet);
		this.customerRepo = getRepository(Customer);
	}

	//> Querys
	@Query(() => [Pet])
	async getAllPets(): Promise<Pet[] | undefined> {
		return await this.petRepo.find();
	}
	@Query(() => Pet)
	async getOnePetById(
		@Arg('input', () => PetInputId) input: PetInputId
	): Promise<Pet | undefined> {
		try {
			const petFound = await this.petRepo.findOne(input._id);
			if (!petFound) {
				throw new Error('El peludo no se encontro');
			}
			return petFound;
		} catch (e) {
			throw new Error('El peludo no se encontro');
		}
	}
	@Query(() => [Pet])
	async getAllPetsByUser(
		@Arg('input', () => FindCustomerInputID) input: FindCustomerInputID
	): Promise<Pet[] | undefined> {
		const customerFound = await this.customerRepo.findOne(input.customerid);
		if (!customerFound) {
			throw new Error('El peludo no se encontro');
		}
		return await this.petRepo.find({
			where: {
				customer: input.customerid
			}
		});
	}
	//> Mutations
	@Mutation(() => Pet)
	async createAPet(
		@Arg('input', () => PetInput) input: PetInput
	): Promise<Pet | undefined> {
		try {
			const customerExist = await this.customerRepo.findOne(input.customer_id);
			if (!customerExist) {
				throw new Error('El cliente no existe');
			}
			const petCreated = await this.petRepo.create({
				pet_name: input.pet_name,
				pet_gender: input.pet_gender,
				pet_group: input.pet_group,
				customer: input.customer_id,
				createdAt: Number(Date.now())
			});
			await this.petRepo.save(petCreated);
			const mypet = await this.petRepo.findOne(petCreated);
			return mypet;
		} catch (e) {
			console.error(e);
		}
	}
	@Mutation(() => Pet)
	async updatePetNameById(
		@Arg('input', () => PetUpdateInput) input: PetUpdateInput
	): Promise<Pet | undefined> {
		try {
			const petValidator = await this.petRepo.findOne(input._id);

			if (!petValidator) {
				throw new Error('El peludo no esta creado');
			}

			await this.petRepo.update(petValidator, {
				pet_name: input.pet_name
			});
			const petUpdated = await this.petRepo.findOne(input._id);
			return petUpdated;
		} catch (e) {
			console.log(e);
		}
	}
	@Mutation(() => Pet)
	async updatePetCustomerById(
		@Arg('input', () => PetUpdateInput) input: PetUpdateInput
	): Promise<Pet | undefined> {
		try {
			const petValidator = await this.petRepo.findOne(input._id);

			if (!petValidator) {
				throw new Error('El peludo no esta creado');
			}
			const petCustomer = await this.customerRepo.findOne({
				_id: input.customer
			});

			if (!petCustomer) {
				throw new Error('El cliente no esta creado');
			}
			await this.petRepo.update(petValidator, {
				customer: input.customer
			});
			console.log(petCustomer);
			const petUpdated = await this.petRepo.findOne(input._id);
			return petUpdated;
		} catch (e) {
			console.log(e);
		}
	}
	@Mutation(() => Boolean)
	async deleteOnePetByID(
		@Arg('input', () => PetInputId) input: PetInputId
	): Promise<Boolean | undefined> {
		const petValidator = await this.petRepo.findOne(input._id);
		if (!petValidator) {
			throw new Error('El peludo no esta creado');
		}
		await this.petRepo.delete(input._id);
		return true;
	}
}
