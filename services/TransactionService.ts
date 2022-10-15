import { Service } from "typedi";
import { IPayload } from "../interfaces/IPayload";
import { TransactionRepository } from "../repositories/TransactionRepository";

@Service()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  public async getTransaction(query: any) {
    return await this.transactionRepository.find(query);
  }

  // create transaction service
  public async createTransaction(req, data: IPayload) {
    const { id, date } = req;

    const { status } = data;

    return await this.transactionRepository.create(id, date, status);
  }
}
