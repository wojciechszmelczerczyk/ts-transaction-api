import { Service } from "typedi";
import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";
import { parse } from "json2csv";
import { appendFile } from "fs";

@Service()
export class TransactionRepository implements IWrite, IRead {
  find(item: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  create(id: string, date: Date, status: string): Date {
    const csv = parse({ id, date, status });

    const csvWithEndingCommas = csv.replace(/\n/g, ",\n");

    appendFile("transactions.csv", csvWithEndingCommas, (err) => {
      if (err) console.error("Cannot append data to file");
      console.log("The data was appended to file!");
    });

    // write to csv file
    return date;
  }
}
