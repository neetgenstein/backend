import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation failed',
    errors: errors.array().map((e) => ({ field: e.path, msg: e.msg })),
  });
}
