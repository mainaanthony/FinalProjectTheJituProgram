const {new_user_schema} = require('../Schema/userSchema')




function newUserValidator(body){

let user = new_user_schema.validate(body, {abortEarly: false})

if(user.error && user.error.details && user.error.details.length){
   let message = user.error.details.map((err) =>err.message)
   throw new Error(message.join("\n"))



}else{
    return user
}

}

module.exports = {newUserValidator}