const AppError = require("../utils/appError");

const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

const prodError = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const handleValidationErrorDB = (error) => {
  let allErrors = Object.values(error.errors).map((el) => el.message);

  const message = `Invalid Input ${allErrors.join(". ")}}`;

  return new AppError(message, 400);
};

const handleDuplicateFields = (error) => {
  const message = `Duplicate field value: ${error.keyValue.name}. Please use another value!`;

  return new AppError(message, 400);
};

const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode);

  if (process.env.NODE_ENV === "development") {
    devError(res, err);
  } else if (process.env.NODE_ENV === "production") {
    {
      let error = { ...err };
      error.name = err.name;
      error.code = err.code;

      if (err.name === "ValidationError") {
        error = handleValidationErrorDB(err);
      }

      if (error.code === 11000) {
        error = handleDuplicateFields(error);
      }
    }

    prodError(res, error);
  }
};

module.exports = globalErrorController;
