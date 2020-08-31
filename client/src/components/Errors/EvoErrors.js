export class EvoError extends Error {}

export class EvoValidationError extends EvoError {
  constructor(err) {
    let message = err.message;
    err.errors.forEach((item) => {
      message += `\n${item.subject.toUpperCase()} -> ${item.reason}`;
    });
    super(`Ошибка записи в облако!\n${message}`);
    this.name = 'EvoValidationError';
    this.errors = err.errors;
  }
}
