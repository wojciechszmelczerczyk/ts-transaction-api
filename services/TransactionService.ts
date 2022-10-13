import { Service } from "typedi";
import { IPayload } from "../interfaces/IPayload";
import { TransactionRepository } from "../repositories/TransactionRepository";

@Service()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  // create transaction service
  public createTransaction(req, data: IPayload) {
    const { id, date } = req;

    const { status } = data;

    return this.transactionRepository.create(id, date, status);
  }
}
