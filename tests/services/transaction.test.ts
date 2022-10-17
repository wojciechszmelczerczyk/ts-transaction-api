import { describe, expect, test } from "@jest/globals";
import { TransactionService } from "../../services/TransactionService";
import { TransactionRepository } from "../../repositories/TransactionRepository";

describe("TransactionService -> createTransaction()", () => {
  const req = {
    date: new Date("2012-01-01"),
  };

  const body = {
    date: new Date("2012-01-01"),
    status: "true",
  };

  test("when date and status are correct, should create transaction in csv file", async () => {
    const res = await new TransactionService(
      new TransactionRepository()
    ).createTransaction(req, body);

    expect(res).toStrictEqual(new Date("2012-02-01T00:00:00.000Z"));
  });

  test("when status incorrect, should return error message", async () => {
    body.status = "";

    const res = await new TransactionService(
      new TransactionRepository()
    ).createTransaction(req, body);

    expect(res).toStrictEqual({
      err: "Bad status type. Status has to be either 'true' or 'false'",
    });
  });
});

describe("TransactionService -> getTransaction()", () => {
  test("when page and limit parameters correct, should return paginated csv", () => {
    const queryParams = {
      page: "1",
      limit: "2",
    };
    const res = new TransactionService(
      new TransactionRepository()
    ).getTransaction(queryParams);

    expect(res).toBeTruthy();
  });

  test("when data doesn't exist for provided page and limit parameters, should return error message", () => {
    const queryParams = {
      page: "10000",
      limit: "20000",
    };
    const res = new TransactionService(
      new TransactionRepository()
    ).getTransaction(queryParams);

    expect(res).toStrictEqual({ err: "No data available for this parameters" });
  });

  test("when provided page and limit parameters are incorrect, should return error message", () => {
    const queryParams = {
      page: "s",
      limit: "s",
    };
    const res = new TransactionService(
      new TransactionRepository()
    ).getTransaction(queryParams);

    expect(res).toStrictEqual({
      err: "Page and limit have to be positive numeric values",
    });
  });
});
