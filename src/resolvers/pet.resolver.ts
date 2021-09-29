import { Arg, Query, Resolver, InputType, Field } from "type-graphql";
import { getMongoRepository, MongoRepository } from "typeorm";
import { Pet } from "../entity/pet.entity";

@InputType()
export class PetInputId {
  @Field(() => Number)
  _id!: number;
}

@Resolver()
export class PetResolver {
  petRespository: MongoRepository<Pet>;
  constructor() {
    this.petRespository = getMongoRepository(Pet);
  }

  @Query(() => Pet)
  getOnePetById(
    @Arg("input", () => PetInputId) input: PetInputId
  ): Promise<Pet | undefined> {
    return this.petRespository.findOne({ _id: input._id });
  }
}
