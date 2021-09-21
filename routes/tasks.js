const router = require('express').Router();
const TasksController = require('../controller/tasks');
const { cekLogin } = require('../middlewares/auth');

router.get('/', cekLogin, TasksController.getAll);
router.post('/', cekLogin, TasksController.create);
router.delete('/:id', cekLogin, TasksController.delete);
router.put('/:id', cekLogin, TasksController.edit);


module.exports = router;