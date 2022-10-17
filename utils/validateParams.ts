export const validateParams = (param: string): Error | void => {
  if (isNaN(parseInt(param)) && param !== undefined) {
    throw new Error("Page and limit have to be positive numeric values");
  }
};
