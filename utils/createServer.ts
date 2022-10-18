import "reflect-metadata";
import express from "express";
import { useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import { TransactionController } from "../controllers/TransactionController";

export const createServer = () => {
  useContainer(Container);

  const app = express();

  app.use(express.json());

  return useExpressServer(app, {
    routePrefix: "/api",
    controllers: [TransactionController],
    defaultErrorHandler: false,
  });
};
