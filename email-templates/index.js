const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },
  [emailActionsEnum.DELETE_USER]: {
    templateName: 'delete-account',
    subject: 'Account successful deleted'
  },
  [emailActionsEnum.UPDATE_USER]: {
    templateName: 'update-account',
    subject: 'Account successful updated'
  },
  [emailActionsEnum.VERIFY_ACCOUNT]: {
    templateName: 'activate-account',
    subject: 'Activate account'
  },
  [emailActionsEnum.CHANGE_PASSWORD]: {
    templateName: 'change-password',
    subject: 'Change password'
  }
};
