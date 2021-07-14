module.exports = {
  userNormalizator: (userToNormalize = {}) => {
    const fieldsToRemove = [
      'password',
      'emailToken',
      'deleted',
      'deletedAt',
      'passwordToken'
    ];

    fieldsToRemove.forEach((filed) => {
      delete userToNormalize[filed];
    });

    return userToNormalize;
  }
};
