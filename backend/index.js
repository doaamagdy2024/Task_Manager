const express = require('express');
const app = express();
const httpStatusText = require('./utils/httpStatusText.js');
const port = process.env.PORT || 3000;
const cors = require('cors');

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
app.use(cors()); // to allow cross-origin requests (cross origin resource sharing) -- so that the frontend can access the backend  (frontend and backend are on different servers)
app.use(express.json());

// routes
const tasksRoute = require('./routes/tasks_route');
app.use('/api/tasks', tasksRoute);

const usersRoute = require('./routes/users_route');
app.use('/api/users', usersRoute);


// error handling --> if the route is not found
app.all('*', (req, res) => {
    res.status(404).json({status: httpStatusText.FAILURE, message: 'Resource not found'});
    }
);

// error handling --> global error handler
app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.statusCode || 500).json({status: err.statusText, message: err.message});
    // res.status(500).json({status: httpStatusText.ERROR, message: err.message});
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
