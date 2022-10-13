import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  UseBefore,
  Req,
} from "routing-controllers";
import { TransactionService } from "../services/TransactionService";
import { dataHandling } from "../middlewares/dataHandling";
import { Service } from "typedi";
import { IPayload } from "../interfaces/IPayload";
import { errorHandling } from "../middlewares/errorHandling";

@Controller("/transaction")
@Service()
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseBefore(dataHandling)
  @UseBefore(errorHandling)
  createTransaction(@Req() req, @Body() data: IPayload) {
    return this.transactionService.createTransaction(req, data);
  }
}
