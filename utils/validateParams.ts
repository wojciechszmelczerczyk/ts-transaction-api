export const validateParams = (param: string): Error | "" =>
  isNaN(parseInt(param)) && param !== undefined
    ? new Error("Param has to be positive numeric value")
    : "";
