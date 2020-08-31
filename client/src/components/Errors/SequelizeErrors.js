export class SequelizeError extends Error {};

export class SequelizeValidationError extends SequelizeError {
  constructor(errors = []) {
    super(`Ошибка базы данных:\n\r ${errors[0].message}`);
    this.name = 'SequelizeValidationError';
    this.errors = errors;
  }
}
export class SequelizeUniqueConstraintError extends SequelizeError {
  constructor(errors = []) {
    super(
      `Ошибка уникальности ключа:
        ${errors[0].path}: ${errors[0].value}
        Попробуйте обновить данные с помощью метода PUT`,
    );
    this.name = 'SequelizeUniqueConstraintError';
    this.errors = errors;
  }
}
