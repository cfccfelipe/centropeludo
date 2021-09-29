import express from "express";
import "reflect-metadata";
//Using graphql and express
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//resolvers
import { PetResolver } from "./resolvers/pet.resolver";
import { CustomerResolver } from "./resolvers/customer.resolver";
import { ProductResolver } from "./resolvers/product.resolver";
import { SaleResolver } from "./resolvers/sale.resolver";

export async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PetResolver, CustomerResolver, ProductResolver, SaleResolver],
    }),
  });
  apolloServer.applyMiddleware({ app, path: "/db" });

  return app;
}
