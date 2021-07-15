const { errorMessage: { ROUT_NOT_FOUND, UNKNOWN_ERROR } } = require('../error');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  _handleErrors(err, req, res, next) {
    res
      .status(err.status)
      .json({
        message: err.message || UNKNOWN_ERROR.message,
        customCode: err.code || UNKNOWN_ERROR.code
      });
  },

  _notFoundHandler: (err, req, res, next) => {
    next({
      status: err.status || ROUT_NOT_FOUND.code,
      message: err.message || ROUT_NOT_FOUND.message
    });
  },

};
