const Task = require('../models/task');
const AppError = require('../utils/appError');

// for validation
// const { body, validationResult } = require('express-validator');

// use jSend for response
const httpStatusText = require('../utils/httpStatusText.js');

const asynchWrapper = require('../middlewares/asynchWrapper.js');

const getTask = asynchWrapper(async (req, res, next) => {
        const _id = req.params.id;
        const task = await Task.findById(_id);
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
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
        return next(new AppError('Task not found', 404, httpStatusText.FAILURE));
        // return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
    }
    res.send(task);

});


const deleteTask = asynchWrapper(async (req, res, next) => {
    //get the query parameter from the URL
    // console.log(req.query._id);
    const task = await Task.findByIdAndDelete(req.query._id);
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

    const tasks = await Task.find().limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: tasks});

});


const createTask = asynchWrapper(async (req, res, next) => {
    // console.log(req.body);
    const task = new Task(req.body);
    // console.log(task);
    await task.save();
    res.status(201).json({status: httpStatusText.SUCCESS, message: 'Task created successfully', data: task});


});

const filterTasks = asynchWrapper(async (req, res, next) => {
    const iscompleted = req.query.completed === 'true'; // convert string to boolean

    const tasks = await Task.find({ completed: iscompleted });
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