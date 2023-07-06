const postHandlerRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {createNewPost} = require('../Controllers/handleUploading')



postHandlerRouter.post('/Post', createNewPost);
//postHandlerRouter.get('/feed', GetPostsFeed)

//postHandlerRouter.use(sessionHandler)
//postHandlerRouter.get("/logout", logout)
module.exports = postHandlerRouter