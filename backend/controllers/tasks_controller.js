const Task = require('../models/task');

// for validation
// const { body, validationResult } = require('express-validator');

// use jSend for response
const httpStatusText = require('../utils/httpStatusText.js');

const getTask = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
        }
        res.json({status: httpStatusText.SUCCESS, data: task});
    } catch (e) {
        res.status(500).json({status: httpStatusText.ERROR, message: e.message});
    }
}


const updateTask = async (req, res) => {
    
    const updates = Object.keys(req.body); // Object.keys() returns an array of a given object's own property names for example ['title', 'completed', 'description', 'dueDate']
    const allowedUpdates = ['title', 'completed', 'description', 'dueDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({status: httpStatusText.FAILURE, message: 'Invalid updates!'});
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
        }
        res.send(task);
    } catch (e) {
        res.status(400).json({status: httpStatusText.ERROR, message: e.message});
    }
}

const deleteTask = async (req, res) => {
    //get the query parameter from the URL
    console.log(req.query._id);
    try {
        const task = await Task.findByIdAndDelete(req.query._id);
        if (!task) {
            return res.status(404).json({status: httpStatusText.FAILURE, message: 'Task not found'});
        }
        res.json({status: httpStatusText.SUCCESS, message: 'Task deleted successfully', data: task});
    } catch (e) {
        res.status(500).json({status: httpStatusText.ERROR, message: e.message});
    }
}

const getAllTasks = async (req, res) => {
    // using pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    try {
        const tasks = await Task.find().limit(limit).skip(skip);
        res.json({status: httpStatusText.SUCCESS, data: tasks});
    } catch (e) {
        res.status(500).json({status: httpStatusText.ERROR, message: e.message});
    }
}


const createTask = async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    try {
        // console.log(task);
        await task.save();
        res.status(201).json({status: httpStatusText.SUCCESS, message: 'Task created successfully', data: task});
    } catch (e) {
        res.status(400).json({status: httpStatusText.ERROR, message: e.message});
    }

}

const filterTasks = async (req, res) => {
    const iscompleted = req.query.completed === 'true';

    try {
        const tasks = await Task.find({ completed: iscompleted });
        res.json({status: httpStatusText.SUCCESS, data: tasks});
    } catch (e) {
        res.status(500).json({status: httpStatusText.ERROR, message: e.message});
    }
}




module.exports = {
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
    createTask,
    filterTasks
}