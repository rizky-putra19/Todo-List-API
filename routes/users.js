const router = require('express').Router();
const UsersController = require('../controller/users');
// const { cekLogin } = require('../middlewares/auth');

router.post('/signin', UsersController.signIn);
router.post('/signup', UsersController.create);

module.exports = router;