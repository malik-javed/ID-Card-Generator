export class CustomError extends Error {
  constructor(statusCode, erros) {
    super('Custom Error');
    this.statusCode = statusCode;
    this.erros = erros;
  }
}
