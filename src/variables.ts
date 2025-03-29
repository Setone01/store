import dotenv from "dotenv";

dotenv.config();

const variables = {
  app: {
    port: Number(process.env.PORT),
  },
};


export default variables;