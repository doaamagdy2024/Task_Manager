const Task = require('../models/task');
const AppError = require('../utils/appError');

// for validation
// const { body, validationResult } = require('express-validator');

// use jSend for response
const httpStatusText = require('../utils/httpStatusText.js');

const asynchWrapper = require('../middlewares/asynchWrapper.js');

const getTask = asynchWrapper(async (req, res, next) => {
        // const _id = req.params.id;
        // const task = await Task.findById(_id);
        // if (!task) {
        //     return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
        //     // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
        // }
        // res.json({status: httpStatusText.SUCCESS, data: task});

        // return the task relatd to the user
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
            // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
        }
        res.json({status: httpStatusText.SUCCESS, data: task});
    }
);


const updateTask = asynchWrapper(async (req, res, next) => {
    
    const updates = Object.keys(req.body); // Object.keys() returns an array of a given object's own property names for example ['title', 'completed', 'description', 'dueDate']
    const allowedUpdates = ['title', 'completed', 'description', 'dueDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return next(new AppError('Invalid updates!', 400, httpStatusText.FAILURE));
        // return res.status(400).json({status: httpStatusText.FAILURE, message: 'Invalid updates!'});
    }
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    // if (!task) {
    //     return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
    //     // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
    // }
    // res.send(task);

    // update the task related to the user
    const task = await Task.findOne({ _id: req.query._id, user: req.user.id });
    if (!task) {
        return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
        // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
    }
    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    res.json({status: httpStatusText.SUCCESS, message: 'Task updated successfully', data: task});

});


const deleteTask = asynchWrapper(async (req, res, next) => {

    // delete the task related to the user
    const task = await Task.findOneAndDelete({ _id: req.query._id, user: req.user.id });
    if (!task) {
        return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
        // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
    }
    res.json({status: httpStatusText.SUCCESS, message: 'Task deleted successfully', data: task});

});

const getAllTasks = asynchWrapper(async (req, res, next) => {
    // using pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // return the tasks related to the user
    const tasks = await Task.find({ user: req.user.id }).limit(limit).skip(skip);
    if (!tasks) { // if null
        return next(new AppError('No tasks found', 404, httpStatusText.FAILURE));
        // return res.status(404).json({status: httpStatusText.FAILURE, message: 'No tasks found'});
    }
    // even if there are no tasks, we should return an empty array (success)
    res.json({status: httpStatusText.SUCCESS, data: tasks});


});


const createTask = asynchWrapper(async (req, res, next) => {
    const task = new Task({
        ...req.body,
        user: req.user.id
    });
    await task.save();
    res.status(201).json({status: httpStatusText.SUCCESS, message: 'Task created successfully', data: task});

});

const filterTasks = asynchWrapper(async (req, res, next) => {
    const iscompleted = req.query.completed === 'true'; // convert string to boolean

    // return the tasks related to the user
    const tasks = await Task.find({ completed: iscompleted, user: req.user.id });
    if (!tasks) { // if null
        return next(new AppError('No tasks found', 404, httpStatusText.FAILURE));
        // return res.status(404).json({status: httpStatusText.FAILURE, message: 'No tasks found'});
    }
    res.json({status: httpStatusText.SUCCESS, data: tasks});

});




module.exports = {
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
    createTask,
    filterTasks
}