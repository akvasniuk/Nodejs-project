const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');
const { userService } = require('../services');
const { userValidator, urlValidator } = require('../validators');
const { userHelper } = require('../helpers');

module.exports = {
  isUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await userService.findUserByEmail(email);

      if (userByEmail) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_IS_REGISTER.message, errorMessage.USER_IS_REGISTER.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserExists: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const { error } = await urlValidator.urlValidator.validate(userId);

      if (error) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          error.details[0].message,
          errorMessage.USER_ID_NOT_VALID.code
        );
      }

      const userById = await userService.findUser({ _id: userId }).lean();

      if (!userById) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      const normalizedUser = userHelper.userNormalizator(userById);

      req.user = normalizedUser;

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserDataValid: async (req, res, next) => {
    try {
      const { error } = await userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserUpdateDataValid: async (req, res, next) => {
    try {
      const { error } = await userValidator.updateUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  IsPasswordExists: (req, res, next) => {
    try {
      const { password } = req.body;

      if (password) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          errorMessage.CANT_UPDATE_PASSWORD.message,
          errorMessage.CANT_UPDATE_PASSWORD.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
