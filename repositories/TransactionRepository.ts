import { Service } from "typedi";
import { IRead, IWrite } from "../interfaces";
import { createObjectCsvWriter } from "csv-writer";
import { appendFile } from "fs/promises";
import { getJsonFromCsv } from "convert-csv-to-json";
import { parse } from "json2csv";
const { paginate } = require("paginatejson");

@Service()
export class TransactionRepository implements IWrite, IRead {
  async find(query: any) {
    // intercept query parameters
    const { page, limit } = query;

    // parse .csv to .json
    const json = getJsonFromCsv("transactions.csv");

    // paginate json data
    const { items } = paginate(json, page, limit);

    // parse back to csv
    const paginatedCsv = parse(items);

    return paginatedCsv;
  }

  async create(id: string, date: Date, status: string): Promise<Date> {
    // add new line to file
    await appendFile("transactions.csv", "\n");

    // create writer object
    const csvWriter = createObjectCsvWriter({
      path: "transactions.csv",
      header: [
        { id: "id", title: "ID" },
        { id: "date", title: "DATE" },
        { id: "status", title: "STATUS" },
      ],
      append: true,
      fieldDelimiter: ";",
      headerIdDelimiter: ";",
    });

    const transaction = [{ id, date, status }];

    // write transaction data to file
    csvWriter.writeRecords(transaction);

    // return modified date
    return date;
  }
}
