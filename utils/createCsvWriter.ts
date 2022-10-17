import { createObjectCsvWriter } from "csv-writer";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";

export const createCsvWriter = (path: string): CsvWriter<Object> =>
  createObjectCsvWriter({
    path,
    header: [
      { id: "id", title: "ID" },
      { id: "date", title: "DATE" },
      { id: "status", title: "STATUS" },
    ],
    append: true,
  });
