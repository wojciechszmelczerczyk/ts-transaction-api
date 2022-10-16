import { createObjectCsvWriter } from "csv-writer";

export const createCsvWriter = (path: string) =>
  createObjectCsvWriter({
    path,
    header: [
      { id: "id", title: "ID" },
      { id: "date", title: "DATE" },
      { id: "status", title: "STATUS" },
    ],
    append: true,
  });
