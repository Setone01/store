import variables from "@src/variables";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export class JWT {
  private static secret: jwt.Secret = variables.AUTH.secret;

  public static encode<T>(
    payload: Partial<T>,
    options?: Partial<jwt.SignOptions>
  ): string {
    console.log("secret", this.secret, "", process.env.JWT_SECRET);
    try {
      const expiryTime = "4d";
      const token = jwt.sign(payload, this.secret, {
        expiresIn: expiryTime,
        ...options,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  public static decode(token: string): jwt.JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded as jwt.JwtPayload;
    } catch (error) {
      throw error;
    }
  }
}
