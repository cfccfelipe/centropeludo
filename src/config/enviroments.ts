import dotenv from "dotenv";

dotenv.config();

export const enviroment = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_MONGO:
    "mongodb+srv://fitploal2017:fitploal2017@cluster0.x9zyw.mongodb.net/centropeludo?retryWrites=true&w=majority",
};
