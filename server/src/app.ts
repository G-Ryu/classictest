import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import "reflect-metadata";
import dbconfig from "./config";
import { userRouter, musicRouter } from "./route";
import verification from "./utils/verification";

const app: express.Application = express();
const port: number = 4000;

createConnection(dbconfig)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => console.log(error));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://onlygryu.shop", "https://localhost:3000"],
    credentials: true,
  })
);

app.use(verification);

app.use("/user", userRouter);
app.use("/music", musicRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
