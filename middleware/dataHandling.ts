import { modifyDate } from "../util/modifyDate";
import { v4 as uuidv4 } from "uuid";

import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class dataHandling implements ExpressMiddlewareInterface {
  use(req, res: Response, next?: (err?: any) => any) {
    // intercept date and status from request body
    const { date, status } = req.body;

    // parse string status to boolean value
    var booleanStatus = status === "true";

    // create mock id
    const id = uuidv4();

    // parse string date into Date object
    const toDate = new Date(date);

    // use function from task 1
    const modifiedDate = modifyDate(toDate, booleanStatus);

    // attach to request object
    req.date = modifiedDate;
    req.id = id;

    next();
  }
}
