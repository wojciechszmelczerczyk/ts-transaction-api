import { config } from "dotenv";
import { Service } from "typedi";
import { IPayload, IRead, IWrite } from "../interfaces";
import { createCsvWriter } from "../utils";
import { appendFile } from "fs/promises";
import { parse } from "json2csv";
const { paginate } = require("paginatejson");
import csvToJson from "convert-csv-to-json";
import { QueryType } from "../types";
import { Response } from "express";

config();

@Service()
export class TransactionRepository implements IWrite, IRead {
  find(
    pageQueryParam: QueryType,
    limitQueryParam: QueryType,
    res: Response
  ): String | Object {
    try {
      // proceed and parse .csv to .json
      const json: string = csvToJson
        .fieldDelimiter(",")
        .getJsonFromCsv(process.env.CSV_FILENAME);

      // paginate json data
      const { items } = paginate(json, pageQueryParam, limitQueryParam);

      // when no data returned from pagination, throw an error
      if (items.length === 0)
        throw new Error("No data available for this parameters");

      // parse back to csv
      const paginatedCsv = parse(items);

      return paginatedCsv;
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create(id: string, date: Date, status: string): Promise<any> {
    // add new line to file
    await appendFile(process.env.CSV_FILENAME, "\n");

    const transaction: IPayload[] = [{ id, date, status }];

    // write transaction data to file
    createCsvWriter(process.env.CSV_FILENAME).writeRecords(transaction);

    // return modified date
    return { modifiedDate: date };
  }
}
