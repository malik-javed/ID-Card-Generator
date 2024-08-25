import { CustomError } from '../libs/CustomError.js';

export const notFound = () => {
  throw new CustomError(404, {
    message: 'This endpoint does not exist!',
  });
};
