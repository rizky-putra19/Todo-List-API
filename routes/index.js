const router = require('express').Router();
const usersRoute = require('./users');
const taskRoute = require('./tasks');

router.use('/users', usersRoute);
router.use('/tasks', taskRoute);

module.exports = router;