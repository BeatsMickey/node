const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

router.get('/', controllers.apiTask.getTasks);
router.post('/', controllers.apiTask.createTask);
router.patch('/description/update', controllers.apiTask.updateTaskDescription);
router.delete('/delete', controllers.apiTask.deleteTask);

module.exports = router;