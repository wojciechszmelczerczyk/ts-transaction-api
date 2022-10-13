import { StatusType } from "../types/StatusType";

export const isStatusCorrect = (status: StatusType) => {
  if (status === "true" || status === "false") return true;
  return false;
};
