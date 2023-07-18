const userRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {postUser, loginUser, logout} = require('../Controllers/users')

//rsrs

userRouter.post('/register', postUser)
userRouter.post('/login/:loginInput/:Password', loginUser)

userRouter.use(sessionHandler)
userRouter.get("/logout", logout)
module.exports = userRouter