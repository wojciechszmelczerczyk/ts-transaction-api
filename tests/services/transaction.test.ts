import { describe, expect, test } from "@jest/globals";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { TransactionService } from "../../services/TransactionService";
import { modifyDate } from "../../utils";

describe("TransactionService -> createTransaction()", () => {
  test("should create new transaction when data is correct", () => {
    const req = {
      id: "ee9e2cf3-f35b-4bef-9f6e-8da2079427b8",
      date: modifyDate(new Date("2003-10-10"), false),
      body: {
        date: new Date("2003-10-10"),
        status: "false",
        id: "ee9e2cf3-f35b-4bef-9f6e-8da2079427b8",
      },
    };

    expect(
      new TransactionService(new TransactionRepository()).createTransaction(
        req,
        req.body
      )
    ).toBeTruthy();
  });
});
