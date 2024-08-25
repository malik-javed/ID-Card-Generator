import { CustomError } from '../libs/CustomError.js';

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.erros);
  }

  return res.status(500).json({
    message: 'Server is under maintenance',
  });
};
