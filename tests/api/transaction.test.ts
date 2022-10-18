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

describe("GET /api/transaction", () => {
  test("when page and limit query params correct, should return records specific for params", async () => {
    const res = await request(app)
      .get("/api/transaction")
      .query({ page: "1", limit: "2" });

    expect(res).toBeTruthy();
  });

  test("when query params exceed number of transactions, should return error message", async () => {
    const res = await request(app)
      .get("/api/transaction")
      .query({ page: "1000", limit: "2000" });

    expect(res.body.err).toBe("No data available for this parameters");
  });

  test("when no query params provided, should return first 5 records", async () => {
    const res = await request(app).get("/api/transaction");
    expect(res).toBeTruthy();
  });

  test("when one of provided parameters incorrect, should return error message", async () => {
    const res = await request(app)
      .get("/api/transaction")
      .query({ page: "x", limit: "2" });

    expect(res.body.err).toBe(
      "Page and limit have to be positive numeric values"
    );
  });
});
