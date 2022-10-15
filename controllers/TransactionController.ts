import {
  Controller,
  Body,
  Get,
  Post,
  UseBefore,
  Req,
  UseAfter,
  QueryParams,
} from "routing-controllers";
import { TransactionService } from "../services/TransactionService";
import { dataHandling, errorHandling } from "../middlewares";
import { Service } from "typedi";
import { IPayload } from "../interfaces";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(@QueryParams() query) {
    return this.transactionService.getTransaction(query);
  }

  @Post()
  @UseBefore(dataHandling, errorHandling)
  createTransaction(@Req() req, @Body() data: IPayload) {
    return this.transactionService.createTransaction(req, data);
  }
}
