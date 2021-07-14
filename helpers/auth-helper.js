const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  constants: {
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    PASSWORD_TOKEN_SECRET,
    PASSWORD_TOKEN_TIME,
    EMAIL_TOKEN_SECRET,
    EMAIL_TOKEN_TIME,
    ACCESS
  },
  statusCode
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TIME });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secretWord = tokenType === ACCESS
        ? ACCESS_TOKEN_SECRET
        : REFRESH_TOKEN_SECRET;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, e.message, errorMessage.UNAUTHORIZED.code);
    }
  },

  generateEmailToken: () => {
    const emailToken = jwt.sign({}, EMAIL_TOKEN_SECRET, { expiresIn: EMAIL_TOKEN_TIME });

    return {
      emailToken,
    };
  },

  verifyEmailToken: async (token) => {
    try {
      await verifyPromise(token, EMAIL_TOKEN_SECRET);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, e.message, errorMessage.UNAUTHORIZED.code);
    }
  },

  generatePasswordToken: () => {
    const passwordToken = jwt.sign({}, PASSWORD_TOKEN_SECRET, { expiresIn: PASSWORD_TOKEN_TIME });

    return {
      passwordToken,
    };
  },

  verifyPasswordToken: async (token) => {
    try {
      await verifyPromise(token, PASSWORD_TOKEN_SECRET);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, e.message, errorMessage.UNAUTHORIZED.code);
    }
  }
};
