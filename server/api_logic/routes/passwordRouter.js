const passRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const { updatePassword, feedSpecific, feedSpecificInfo} = require('../Controllers/password')

passRouter.put('/updatePass/:nowPassword/:newPassword/:confirmPassword', updatePassword);
passRouter.get('/feedSpecific/:userID', feedSpecific)
passRouter.get('/feedSpecificInfo/:userID', feedSpecificInfo)


module.exports = passRouter