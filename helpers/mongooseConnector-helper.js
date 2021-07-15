const mongoose = require('mongoose');

const { constants: { DB_URL } } = require('../constants');

module.exports = {
  _mongooseConnector: () => {
    mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
  }
};
