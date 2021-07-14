const { User } = require('../database');

module.exports = {
  getAllUsers: () => User.find({ deleted: false }),

  insertUser: (user) => User.create(user),

  findUser: (userParam) => User.findOne({ ...userParam, deleted: false }),

  updateUser: (user, updatedUser) => User.updateOne(user, updatedUser),

  deleteUser: (user) => Object.assign(user, { deleted: true, deletedAt: Date.now() }),

  findUserByEmail: (email) => User.findOne({ email, deleted: false })
};
