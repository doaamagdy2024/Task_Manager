const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // optional description
    description: {
        type: String,
        trim: true,
        required: false
    },
    // optional due date
    dueDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // reference to the user who created the task
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // TODO: change to true
        ref: 'User'
    }

});

module.exports = mongoose.model('Task', taskSchema);