import { createConnection } from "typeorm";
import path from "path";
import { enviroment } from "./enviroments";

export default async function connect() {
  await createConnection({
    type: "mongodb",
    //host: enviroment.DB_HOST,
    //port: Number(enviroment.DB_PORT),
    //database: enviroment.DB_DATABASE,
    url: enviroment.DB_MONGO,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    poolSize: 10,
    logging: false,
    synchronize: true,
    entities: [path.join(__dirname, "../entity/**/**.ts")],
  });
  console.log("Database connected");
}
