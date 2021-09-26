import express from "express";
import "reflect-metadata";
//Using graphql and express
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//resolvers
import { PetResolver } from "./resolvers/pet.resolver";

export async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [PetResolver] }),
  });
  apolloServer.applyMiddleware({ app, path: "/db" });

  return app;
}
