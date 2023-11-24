const errorHandler = (err, req, res, next) => {
  console.log(err, 2);
  let statusCode = 500;
  let msg = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    msg = err.errors[0].message;
  }

  if (err.message === "Please input email/password") {
    statusCode = 401;
    msg = err.message;
  }

  if (err.message === "Unauthorized") {
    statusCode = 401;
    msg = err.message;
  }

  if (err.message === "Invalid email/password") {
    statusCode = 401;
    msg = err.message;
  }

  if (err.message === "Error Not Found") {
    statusCode = 404;
    msg = err.message;
  }

  res.status(statusCode).json({ msg });
};

module.exports = errorHandler;
