import { ExpressMiddlewareInterface } from "routing-controllers";
import { validateParams } from "../utils";
import { Service } from "typedi";

@Service()
export class queryParamsHandling implements ExpressMiddlewareInterface {
  use(req, res: Response, next?: (err?: any) => any): void {
    try {
      // intercept query params
      const { page, limit } = req.query;

      validateParams(page);

      validateParams(limit);

      next();
    } catch (err) {
      next(err);
    }
  }
}
