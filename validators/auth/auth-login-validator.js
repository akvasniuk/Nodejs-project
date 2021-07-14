const Joi = require('joi');
const { Regexp } = require('../../constants');

module.exports = Joi.object({
  email: Joi
    .string()
    .regex(Regexp.EMAIL)
    .required(),
  password: Joi
    .string()
    .regex(Regexp.PASSWORD)
    .min(8)
    .max(100)
    .required()
});
