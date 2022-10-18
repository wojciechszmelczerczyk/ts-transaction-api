import { describe, expect, test } from "@jest/globals";
import { Application } from "express";
import request from "supertest";
import { createServer } from "../../utils/createServer";

let app: Application;

beforeAll(() => {
  app = createServer();
});

describe("POST /api/transaction", () => {
  test("when date correct and status true, should return date month in future", async () => {
    const res = await request(app)
      .post("/api/transaction")
      .send({ date: "2012-02-02", status: "true" });

    expect(new Date(res.body.modifiedDate)).toStrictEqual(
      new Date("2012-03-02")
    );
  });

  test("when date correct and status false, should return date 5 days in future", async () => {
    const res = await request(app)
      .post("/api/transaction")
      .send({ date: "2012-02-02", status: "false" });

    expect(new Date(res.body.modifiedDate)).toStrictEqual(
      new Date("2012-02-07")
    );
  });

  test("when date incorrect, should return error message", async () => {
    const res = await request(app)
      .post("/api/transaction")
      .send({ date: 2, status: "true" });

    expect(res.body).toStrictEqual({
      err: "Bad date format. String has to be date format",
    });
  });

  test("when status incorrect, should return error message", async () => {
    const res = await request(app)
      .post("/api/transaction")
      .send({ date: "2012-02-02", status: "x" });

    expect(res.body).toStrictEqual({
      err: "Bad status type. Status has to be either 'true' or 'false'",
    });
  });
});
