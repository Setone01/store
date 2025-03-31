import dotenv from "dotenv";

dotenv.config();

const variables = {
  APP: {
    port: Number(process.env.PORT),
  },
  AUTH: {
    rounds: Number(process.env.SALT_ROUNDS),
  },
};

export default variables;
