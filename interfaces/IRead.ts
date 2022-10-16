import { QueryType } from "../types/QueryType";

export interface IRead {
  find(pageQueryParam: QueryType, limitQueryParam: QueryType): string;
}
