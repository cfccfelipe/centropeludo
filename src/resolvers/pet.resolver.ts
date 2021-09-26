import { Query, Resolver } from "type-graphql";

@Resolver()
export class PetResolver {
  @Query(() => String)
  getAll() {
    return "All pets here";
  }
}
