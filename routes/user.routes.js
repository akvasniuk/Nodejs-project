const router = require('express').Router();

const { userController } = require('../controllers');
const {
  userMiddleware,
  authMiddleware,
  fileMiddleware
} = require('../middlewars');

router.get('/', userController.allUser);

router.post('/',
  fileMiddleware.checkFiles,
  fileMiddleware.checkAvatar,
  userMiddleware.isUserDataValid,
  userMiddleware.isUserRegister,
  userController.createUser);

router.use('/:userId', userMiddleware.isUserExists);

router.get('/:userId', userController.getUser);

router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUser);

router.patch('/:userId',
  authMiddleware.checkAccessToken,
  userMiddleware.IsPasswordExists,
  userMiddleware.isUserUpdateDataValid,
  userController.updateUser);

router.patch('/:userId/changePassword/activate', authMiddleware.checkAccessToken, userController.verifyUserToChangePassword);

router.patch('/:userId/changePassword/change', authMiddleware.checkPasswordToken('get'), userController.changeUserPassword);

router.patch('/:userId/avatar/update',
  authMiddleware.checkAccessToken,
  fileMiddleware.checkFiles,
  fileMiddleware.checkAvatar,
  userController.updateOrDeleteAvatar);

router.delete('/:userId/avatar/delete', authMiddleware.checkAccessToken, userController.updateOrDeleteAvatar);

module.exports = router;
