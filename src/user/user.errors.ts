export const missingParamsError = (...params: string[]) => ({
  status: 400,
  error: new TypeError(`Required Parameter ${params.map(param => `"${param}"`).join(', ')} is missing`)
});
