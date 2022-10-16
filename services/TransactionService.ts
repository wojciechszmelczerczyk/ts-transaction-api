import { Service } from "typedi";
import { IQueryParams } from "../interfaces";
import { IPayload } from "../interfaces/IPayload";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { QueryType } from "../types";

@Service()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  public getTransaction(query: IQueryParams) {
    // intercept query parameters
    const { page, limit } = query;

    // when no page provided by default display first page
    const pageQueryParam: QueryType = page === undefined ? 1 : page;

    // when no limit provided by default display 5 records
    const limitQueryParam: QueryType = limit === undefined ? 5 : limit;

    return this.transactionRepository.find(pageQueryParam, limitQueryParam);
  }

  // create transaction service
  public async createTransaction(req, data: IPayload) {
    const { id, date } = req;

    const { status } = data;

    return await this.transactionRepository.create(id, date, status);
  }
}
