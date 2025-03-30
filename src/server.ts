import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databse.config";

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
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = Number(process.env.PORT) || 3200;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
