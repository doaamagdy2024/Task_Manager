# Task Manager API

A simple Task Manager application that allows users to create, read, update, and delete tasks, with user authentication and task filtering based on completion status.

## Features

- User authentication (sign up, log in)
- CRUD operations for tasks
- Filter tasks by completion status
- User-specific tasks, ensuring only authenticated users can manage their own tasks

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose for object modeling)
- **Authentication:** JSON Web Token (JWT) for secure routes
- **Libraries:** 
    - `Mongoose` for object modeling
    - `bcryptjs` for password hashing 
    - `dotenv` for environment variables
    - `cors` for cross-origin resource sharing
    - `validator` for input sanitization
    - `express-validator` for request validation

## Dev-dependencies

 **major dev-dependencies of the project:**
 - nodemon
   

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/doaamagdy2024/Task_Manager.git
   cd task-manager-api
   ```
2. **Install all the dependencies:** 
    ```bash
    npm run install-all
    ```

3. **Modify the file named ".env" inside the backend folder. And substitute your credentials there.** 


4. **start the application:** 
    ```bash
    npm run run:dev
    ```
