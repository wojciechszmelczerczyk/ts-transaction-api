import { config } from "dotenv";
import { Service } from "typedi";
import { IRead, IWrite } from "../interfaces";
import { createCsvWriter } from "../util";
import { appendFile } from "fs/promises";
import { parse } from "json2csv";
const { paginate } = require("paginatejson");
import csvToJson from "convert-csv-to-json";
import { QueryType } from "../types";

config();

@Service()
export class TransactionRepository implements IWrite, IRead {
  find(pageQueryParam: QueryType, limitQueryParam: QueryType): string {
    // proceed and parse .csv to .json
    const json: string = csvToJson
      .fieldDelimiter(",")
      .getJsonFromCsv(process.env.CSV_FILENAME);

    // paginate json data
    const { items } = paginate(json, pageQueryParam, limitQueryParam);

    // parse back to csv
    const paginatedCsv = parse(items);

    return paginatedCsv;
  }

  async create(id: string, date: Date, status: string): Promise<Date> {
    // add new line to file
    await appendFile(process.env.CSV_FILENAME, "\n");

    const transaction = [{ id, date, status }];

    // write transaction data to file
    createCsvWriter(process.env.CSV_FILENAME).writeRecords(transaction);

    // return modified date
    return date;
  }
}
