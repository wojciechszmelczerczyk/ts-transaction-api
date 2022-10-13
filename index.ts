import "reflect-metadata";
import express from "express";
import { TransactionController } from "./controllers/TransactionController";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

useContainer(Container);

const app = express();

app.use(express.json());

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [TransactionController],
});

app.listen(3000, () => console.log("Server running on port 3000"));
