export const validateParams = (param: string): Error | void => {
  if (isNaN(parseInt(param)) && param !== undefined) {
    throw new Error("Param has to be positive numeric value");
  }
};
