// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err);
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message:
      process.env.NODE_ENV === "production" ? "An error occurred" : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
