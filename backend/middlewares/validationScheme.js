const {body} = require('express-validator');

const taskValidationRules = () => {
    return [
        body('title').not().isEmpty().withMessage('Title is required').isString().isLength({ min: 3 }),
        body('completed').isBoolean(),
        body('description').isString().isLength({ min: 5 }),
        body('dueDate').isDate()
    ]
}