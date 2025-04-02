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
  CLOUDINARY: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
};

export default variables;
