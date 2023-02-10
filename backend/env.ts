import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "development",
  DB_NAME: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  DB_HOST: "localhost",
  DB_PORT: "",
  JWT_SECRET: "",
  POSTGRES_DB: "",
  POSTGRES_PASSWORD: "",
  POSTGRES_USER: "",
  POSTGRES_HOST: "",
  AWS_ACCESS_KEY_ID: "",
  AWS_SECRET_ACCESS_KEY: "",
  S3_REGION: "",
  S3_BUCKET_NAME: "",
};

populateEnv(env, { mode: "halt" });
