import { Controller, Param, Body, Get, Post } from "routing-controllers";
import { TransactionService } from "../services/TransactionService";
import { Service } from "typedi";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() data: any) {
    return this.transactionService.createTransaction(data);
  }
}
