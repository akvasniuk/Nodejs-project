const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewars');

router.post('/login',
  authMiddleware.checkIsUserDataValid,
  authMiddleware.checkIsUserExist,
  authMiddleware.checkIsPasswordValid,
  authMiddleware.checkIsUserActivated,
  authController.login);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

router.get('/activate/mail/:emailToken', authMiddleware.checkMailToken, authController.activate);

router.get('/activate/password/:passwordToken', authMiddleware.checkPasswordToken(), authController.changePassword);

module.exports = router;
