const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// use .env file
require('dotenv').config();

// connect to database
const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
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
