const profileRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {updateProfilePic, updateProfileBio, updateUserEmail, updateUserName, updateUserAccountOptions, updatePassword, createDeleteAccount, createSearchProfileUserName} = require('../Controllers/profiles')


profileRouter.use(sessionHandler)
profileRouter.post('/updatePic', updateProfilePic);
profileRouter.post('/updateBio', updateProfileBio);
profileRouter.delete('/delete', createDeleteAccount);
profileRouter.post('/updatePass', updatePassword);
profileRouter.post('/updateEmail', updateUserEmail);
profileRouter.post('/updateUsername', updateUserName);
profileRouter.get('/search',createSearchProfileUserName )
profileRouter.post('/updateAccountOptions', updateUserAccountOptions);




module.exports = profileRouter