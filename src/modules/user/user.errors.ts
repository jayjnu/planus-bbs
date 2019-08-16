export const missingParamsError = (...params: string[]) => ({
  status: 400,
  error: new TypeError(`Required Parameter ${params.map(param => `"${param}"`).join(', ')} is missing`)
});

export const notFoundError = (msg: string) => ({
  status: 400,
  error: new Error(msg)
});

export const duplicateUserError = (err: Error) => ({
  status: 400,
  error: err
});
