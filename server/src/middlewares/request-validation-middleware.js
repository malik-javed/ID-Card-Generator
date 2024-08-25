import { CustomError } from '../libs/CustomError.js';

export const validateRequest = (schema, key) => {
  return (req, _, next) => {
    let result = schema.safeParse(req[key]);
    if (result.success) next();
    else {
      const flattenErrors = result.error.flatten();

      const isEmpty = Object.keys(flattenErrors.fieldErrors).length == 0;
      throw new CustomError(404, {
        errors: isEmpty ? flattenErrors.formErrors : flattenErrors.fieldErrors,
      });
    }
  };
};
