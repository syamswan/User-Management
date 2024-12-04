const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
};

module.exports = errorHandler;
