import { v4 as uuidv4 } from "uuid";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { isStatusCorrect, modifyDate } from "../util";
import { Response } from "express";
import { Service } from "typedi";
import moment from "moment";

@Service()
export class dataHandling implements ExpressMiddlewareInterface {
  use(req, res: Response, next?: (err?: any) => any): void {
    try {
      // intercept date and status from request body
      const { date, status } = req.body;

      // check if status is type "true" | "false"
      if (!isStatusCorrect(status))
        throw new Error(
          "Bad status type. Status has to be either 'true' or 'false'"
        );

      // check if date is date regex
      const isDateValid = moment(date).isValid();

      if (!isDateValid || date === undefined)
        throw new Error("Bad date format. String has to be format date");

      // parse string status to boolean value
      var booleanStatus = status === "true";

      // create mock id
      const id = uuidv4();

      // parse string date into Date object
      const toDate = new Date(date);

      // use function from task 1
      const modifiedDate = modifyDate(toDate, booleanStatus);

      // attach to request object modified date and id
      req.date = modifiedDate;
      req.id = id;

      next();
    } catch (err) {
      next(err);
    }
  }
}
