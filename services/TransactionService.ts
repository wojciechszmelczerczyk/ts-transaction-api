import moment from "moment";
import { Service } from "typedi";
import { IQueryParams } from "../interfaces";
import { IPayload } from "../interfaces/IPayload";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { QueryType, StatusType } from "../types";
import { isStatusCorrect, modifyDate, validateParams } from "../utils";
import { v4 as uuidv4 } from "uuid";

@Service()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  public getTransaction(query: IQueryParams) {
    try {
      // intercept query parameters
      const { page, limit } = query;

      validateParams(page);

      validateParams(limit);

      // when no page provided by default display first page
      const pageQueryParam: QueryType = page === undefined ? 1 : page;

      // when no limit provided by default display 5 records
      const limitQueryParam: QueryType = limit === undefined ? 5 : limit;

      return this.transactionRepository.find(pageQueryParam, limitQueryParam);
    } catch (err) {
      return { err: err.message };
    }
  }

  // create transaction service
  public async createTransaction(req, data: IPayload) {
    try {
      const { status, date } = data;

      if (!isStatusCorrect(status as StatusType))
        throw new Error(
          "Bad status type. Status has to be either 'true' or 'false'"
        );

      // check if date is date regex
      const isDateValid = moment(date).isValid();

      if (!isDateValid || date === undefined)
        throw new Error("Bad date format. String has to be date format");

      // parse string status to boolean value
      var booleanStatus = status === "true";

      // create mock id
      const id = uuidv4();

      // parse string date into Date object
      const toDate = new Date(date);

      // use function from task 1
      const modifiedDate = modifyDate(toDate, booleanStatus);

      return await this.transactionRepository.create(id, modifiedDate, status);
    } catch (err) {
      return { err: err.message };
    }
  }
}
