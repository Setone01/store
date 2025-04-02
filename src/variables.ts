import dotenv from "dotenv";

dotenv.config();

const variables = {
  APP: {
    port: Number(process.env.PORT),
  },
  AUTH: {
    rounds: Number(process.env.SALT_ROUNDS),
    secret: process.env.JWT_SECRET,
    jwtExpiryTime: process.env.JWT_EXPIRY_TIME,
  },
};

export default variables;
