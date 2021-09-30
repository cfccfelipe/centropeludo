import { Arg, Query, Resolver, Mutation } from "type-graphql";
import {
  FindAndModifyWriteOpResultObject,
  getMongoRepository,
  MongoRepository,
} from "typeorm";
import { Pet } from "../entity/pet.entity";
import { PetInput, PetInputId, PetUpdateInput } from "../input/pet.input";

@Resolver()
export class PetResolver {
  petRespository: MongoRepository<Pet>;
  constructor() {
    this.petRespository = getMongoRepository(Pet);
  }

  @Query(() => Pet)
  async getOnePetById(
    @Arg("input", () => PetInputId) input: PetInputId
  ): Promise<Pet | undefined> {
    return await this.petRespository.findOne({ _id: input._id });
  }

  @Query(() => [Pet])
  async getAllPets(): Promise<Pet[] | undefined> {
    return await this.petRespository.find();
  }
  @Mutation(() => Pet)
  async createOnePet(
    @Arg("input", () => PetInput) input: PetInput
  ): Promise<Pet | undefined> {
    try {
      const petCreated = await this.petRespository.insert({
        _id: input._id,
        pet_name: input.pet_name,
        pet_gender: input.pet_gender,
        pet_group: input.pet_group,
        customer_id: input.customer_id,
        createdAt: Date.now(),
      });
      try {
        const result = await this.petRespository.findOne(
          petCreated.identifiers[0]
        );
        return result;
      } catch {
        throw new Error("El peludo ya existe");
      }
    } catch (e) {
      console.error(e);
    }
  }
  @Mutation(() => Pet)
  async updatePetById(
    @Arg("input", () => PetUpdateInput) input: PetUpdateInput
  ): Promise<FindAndModifyWriteOpResultObject | undefined> {
    const petValidator = await this.petRespository.findOne({ _id: input._id });
    if (!petValidator) {
      throw new Error("El peludo no esta creado");
    }
    return await this.petRespository.findOneAndUpdate(petValidator, {
      $set: {
        pet_name: input.pet_name,
      },
    });
  }
  @Mutation(() => Boolean)
  async deleteOnePetByID(
    @Arg("input", () => PetInputId) input: PetInputId
  ): Promise<Boolean | undefined> {
    await this.petRespository.deleteOne({ _id: input._id });
    return true;
  }
}
