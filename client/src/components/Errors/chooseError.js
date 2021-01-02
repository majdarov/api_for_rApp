import { SequelizeValidationError, SequelizeUniqueConstraintError } from "./SequelizeErrors";
import { /* EvoError, */ EvoValidationError } from "./EvoErrors";

export const chooseError = (err) => {
    let res = err.response;
    if (res.data.name === 'SequelizeValidationError') {
      return new SequelizeValidationError(res.data.errors);
    } else if (res.data.name === 'SequelizeUniqueConstraintError') {
      return new SequelizeUniqueConstraintError(res.data.errors);
    } else if (res.data.name === 'validation_failed') {
      return new EvoValidationError({ message: res.data.message, errors: res.data.errors});
    } else {
        return new Error(res.data.message);
    }
};
