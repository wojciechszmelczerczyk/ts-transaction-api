import { ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";

@Service()
export class errorHandling implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: Response, next: (err?: any) => any): void {
    res.status(400).json({ err: error.message });
  }
}
