import { QueryType } from "../types/QueryType";
import { Response } from "express";

export interface IRead {
  find(
    pageQueryParam: QueryType,
    limitQueryParam: QueryType,
    res: Response
  ): string | object;
}
