import {
  Controller,
  Body,
  Get,
  Post,
  UseBefore,
  Req,
  QueryParams,
} from "routing-controllers";
import { TransactionService } from "../services/TransactionService";
import { dataHandling, errorHandling, queryParams } from "../middlewares";
import { Service } from "typedi";
import { IPayload, IQueryParams } from "../interfaces";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @UseBefore(queryParams, errorHandling)
  getTransaction(@QueryParams() query: IQueryParams) {
    return this.transactionService.getTransaction(query);
  }

  @Post()
  @UseBefore(dataHandling, errorHandling)
  createTransaction(@Req() req, @Body() data: IPayload) {
    return this.transactionService.createTransaction(req, data);
  }
}
