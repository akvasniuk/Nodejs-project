const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum } = require('../constants');

const oAuthScheme = new Schema({
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  passwordToken: {
    type: String
  },
  emailToken: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTablesEnum.USER
  }
}, { timestamps: true });

oAuthScheme.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(dataBaseTablesEnum.OAUTH, oAuthScheme);
