import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class queryParams implements ExpressMiddlewareInterface {
  use(req, res: Response, next?: (err?: any) => any): void {
    try {
      // intercept query params
      const { page, limit } = req.query;

      if (isNaN(parseInt(page)) && page !== undefined)
        throw new Error("Page has to be positive numeric value");

      if (isNaN(parseInt(limit)) && limit !== undefined)
        throw new Error("Limit has to be positive numeric value");

      next();
    } catch (err) {
      next(err);
    }
  }
}
