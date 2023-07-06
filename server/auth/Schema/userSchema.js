const joi = require('joi')



const new_user_schema = joi.object({
    Name: joi.string()
        .min(3)
        .required(),
    Email: joi.string()
        .min(5)
        .max(50),
    Password: joi.string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
    ContactNumber: joi.string()
        .required()
        ,    
    DateOfBirth: joi.string()
        .min(5)
        .max(30)
        .required(),
    DateOfBirth: joi.date()
        .required(),
    Gender: joi.string()
        .required()
        .min(2)
        ,    
    Country: joi.string()
        .required()
        .min(2)
        ,    
    UserName: joi.string()
        .min(3)
        .required(),    
    c_password: joi.ref('Password')



}).with('Password', 'c_password ')



module.exports = { new_user_schema }