import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  QueryParams,
  UseAfter,
} from "routing-controllers";
import { TransactionService } from "../services/TransactionService";

import { Service } from "typedi";
import { IPayload, IQueryParams } from "../interfaces";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(@QueryParams() query: IQueryParams) {
    return this.transactionService.getTransaction(query);
  }

  @Post()
  createTransaction(@Req() req, @Body() data: IPayload) {
    return this.transactionService.createTransaction(req, data);
  }
}
