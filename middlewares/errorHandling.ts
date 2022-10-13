import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";

@Middleware({ type: "before" })
@Service()
export class errorHandling implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: Response, next: (err?: any) => any): void {
    res.status(400).json({ err: error.message });
  }
}
