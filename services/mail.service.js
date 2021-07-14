const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const { constants: { SYSTEM_EMAIL, SYSTEM_EMAIL_PASSWORD } } = require('../constants');
const templateInfo = require('../email-templates');
const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SYSTEM_EMAIL,
    pass: SYSTEM_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, action, context) => {
  try {
    const templateToSand = templateInfo[action];

    if (!templateToSand) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.WRONG_TEMPLATE.message, errorMessage.WRONG_TEMPLATE.code);
    }

    const html = await templateParser.render(templateToSand.templateName, context);

    return transport.sendMail({
      from: 'No reply',
      to: userMail,
      subject: templateToSand.subject,
      html
    });
  } catch (e) {
    throw new ErrorHandler(statusCode.BAD_REQUEST, e.message);
  }
};

module.exports = {
  sendMail
};
