const Joi = require('joi');
const { Regexp } = require('../../constants');

module.exports = Joi.object({
  name: Joi
    .string()
    .min(3)
    .max(40),
  email: Joi
    .string()
    .regex(Regexp.EMAIL),
  age: Joi
    .number()
    .min(1)
    .max(120),
  password: Joi
    .string()
    .regex(Regexp.PASSWORD)
});
