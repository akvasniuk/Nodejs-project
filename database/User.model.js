const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants/index');

const userSchema = new Schema({
  avatar: {
    type: String
  },
  avatarPhotos: [],
  documents: [],
  videos: [],
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 40
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isUserActivated: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USER, userSchema);
