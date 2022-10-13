import { Inject, Service } from "typedi";
import { TransactionRepository } from "../repositories/TransactionRepository";

@Service()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  // create transaction service
  public createTransaction(data) {
    return this.transactionRepository.create(data);
  }
}
