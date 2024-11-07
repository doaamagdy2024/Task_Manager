const express = require('express');
const router = express.Router();

// controllers
const tasksController = require('../controllers/tasks_controller.js');


// get a task by id / update a task / delete a task
router.route('/:id')
    .get(tasksController.getTask)
    .patch(tasksController.updateTask)
    // .delete(tasksController.deleteTask);


// get all tasks by user / create a task / update a task / delete a task
router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.createTask)
    .delete(tasksController.deleteTask);
    // .patch(tasksController.updateTask);


// filter tasks by completed / incomplete for current user
router.get('/:completed', tasksController.filterTasks);

module.exports = router;

