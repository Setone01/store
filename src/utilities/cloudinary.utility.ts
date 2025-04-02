import { v2 as cloudinary } from "cloudinary";
import variables from "@src/variables";

cloudinary.config({
  cloud_name: variables.CLOUDINARY.cloudName,
  api_key: variables.CLOUDINARY.apiKey,
  api_secret: variables.CLOUDINARY.apiSecret,
});

export const uploadImage = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "products",
  });
  return result.secure_url;
};
