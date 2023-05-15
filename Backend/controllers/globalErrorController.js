const globalErrorController = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  res.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorController;
