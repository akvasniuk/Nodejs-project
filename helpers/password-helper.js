const bcrypt = require('bcrypt');

const { errorMessage, ErrorHandler } = require('../error');
const { statusCode } = require('../constants');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),

  compare: async (password, hash) => {
    const isPasswordCompare = await bcrypt.compare(password, hash);

    if (!isPasswordCompare) {
      throw new ErrorHandler(
        statusCode.BAD_REQUEST,
        errorMessage.WRONG_EMAIL_OR_PASS.message,
        errorMessage.WRONG_EMAIL_OR_PASS.code
      );
    }
  }
};
