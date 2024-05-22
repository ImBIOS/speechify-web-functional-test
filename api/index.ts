import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();
const port = 5174;

app.use(cors());

const getRandomElement = <T>(arr: Array<T>): T =>
  arr[(Math.random() * arr.length) | 0];

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/content", (req: Request, res: Response) => {
  const content = getRandomElement(data);
  res.json(content);
});

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});
