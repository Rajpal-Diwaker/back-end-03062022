const { body, validationResult } = require('express-validator');

exports.validatorRegister = [
    body('firstname','firstname is required').notEmpty().isString(),
    body('lastname','lastname is required').notEmpty().isString(),
    body('email','email is required and must be an email form').notEmpty().isEmail().normalizeEmail(),
    body('password','password is required and must be 5 character').notEmpty().isLength({min:5}),
]

exports.validatorLogin = [
    body('email','email is required and must be an email form').notEmpty().isEmail().normalizeEmail(),
    body('password','password is required and must be 5 character').notEmpty().isLength({min:5}),
]

exports.validation = async(req,res,next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next()
    } catch (error) {
        return res.status(500).send({err:error})
    }
}