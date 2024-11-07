const Task = require('../models/task');

const getTask = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
}


const updateTask = async (req, res) => {
    
    const updates = Object.keys(req.body); // Object.keys() returns an array of a given object's own property names for example ['title', 'completed', 'description', 'dueDate']
    const allowedUpdates = ['title', 'completed', 'description', 'dueDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
}

const deleteTask = async (req, res) => {
    //get the query parameter from the URL
    console.log(req.query._id);
    try {
        const task = await Task.findByIdAndDelete(req.query._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
}


const createTask = async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    try {
        console.log(task);
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

}

const filterTasks = async (req, res) => {
    const completed = req.params.completed;
    try {
        const tasks = await Task.find({ completed: completed });
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
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