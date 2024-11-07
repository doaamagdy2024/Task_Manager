const express = require('express');
const app = express();
const port = 3000;

// connect to database
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/';
const dbName = 'task_manager_db';
mongoose.connect(url + dbName).then(() => {
    console.log('Connected to the database');
    }   
);


// middleware
app.use(express.json());

// routes
const tasksRoute = require('./routes/tasks_route');
app.use('/api/tasks', tasksRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
