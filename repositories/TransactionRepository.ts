import { Service } from "typedi";
import { IQueryParams, IRead, IWrite } from "../interfaces";
import { createObjectCsvWriter } from "csv-writer";
import { readFile, appendFile } from "fs/promises";
import csvToJson from "convert-csv-to-json";
import { parse } from "json2csv";
const { paginate } = require("paginatejson");
import { isEmpty } from "lodash";

@Service()
export class TransactionRepository implements IWrite, IRead {
  async find(query: IQueryParams) {
    // intercept query parameters
    const { page, limit } = query;

    // if no query parameters provided, just read file
    if (isEmpty(query)) {
      return await readFile("transactions.csv", "utf-8");
    }

    // otherwise proceed and parse .csv to .json
    const json = csvToJson
      .fieldDelimiter(",")
      .getJsonFromCsv("transactions.csv");

    // when no page provided by default display first page
    const pageQueryParam = page === undefined ? 1 : page;

    // when no limit provided by default display 5 records
    const limitQueryParam = limit === undefined ? 5 : limit;

    // paginate json data
    const { items } = paginate(json, pageQueryParam, limitQueryParam);

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
    });

    const transaction = [{ id, date, status }];

    // write transaction data to file
    csvWriter.writeRecords(transaction);

    // return modified date
    return date;
  }
}
