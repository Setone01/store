import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databse.config";
import helmet from "helmet";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

dotenv.config();

const app = express();

// Connect DB
connectDB();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/store", (req: Request, res: Response) =>
  res.status(200).json({
    status: "success",
    message: "server is up and running",
    data: null,
  })
);

app.use("/store", userRouter);
app.use("/store", productRouter);

const server = http.createServer(app);

const port = Number(process.env.PORT) || 3200;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
