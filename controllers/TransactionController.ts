import {
  Controller,
  Body,
  Get,
  Post,
  QueryParams,
  Res,
} from "routing-controllers";
import { TransactionService } from "../services/TransactionService";

import { Service } from "typedi";
import { IPayload, IQueryParams } from "../interfaces";
import { Response } from "express";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(@QueryParams() query: IQueryParams, @Res() res: Response) {
    return this.transactionService.getTransaction(query, res);
  }

  @Post()
  createTransaction(@Body() data: IPayload, @Res() res: Response) {
    return this.transactionService.createTransaction(data, res);
  }
}
