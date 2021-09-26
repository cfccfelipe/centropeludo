import { startServer } from "./server";
import connect from "./config/typeorm";
import { enviroment } from "./config/enviroments";

async function main() {
  connect();
  const port: number = Number(enviroment.PORT);
  const app = await startServer();
  app.listen(port);
  console.log("App running on port ", port);
}

main();
