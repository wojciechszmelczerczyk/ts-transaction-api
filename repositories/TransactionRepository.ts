import { Service } from "typedi";
import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";

@Service()
export class TransactionRepository implements IWrite, IRead {
  find(item: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  create(item: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
