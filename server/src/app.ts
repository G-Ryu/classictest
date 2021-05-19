import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";
import "reflect-metadata";
import dbconfig from "./config";

const app: express.Application = express();
const port: number = 4000;

createConnection(dbconfig)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => console.log(error));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/image", express.static("image"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
