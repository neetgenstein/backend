import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export function notFoundHandler(req, res, next) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || getReasonPhrase(status);

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err); // eslint-disable-line no-console
  }

  res.status(status).json({ success: false, message });
}
