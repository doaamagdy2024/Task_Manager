const express = require('express');
const router = express.Router();

// controllers
const tasksController = require('../controllers/tasks_controller.js');


// filter tasks by completed / incomplete for current user
// hint --> I have to write this route before /:id route to give it priority so that it check this route first
// if I write it after /:id route then it will consider 'filter' as an id and will not work
router.route('/filter')
    .get(tasksController.filterTasks);

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



module.exports = router;

