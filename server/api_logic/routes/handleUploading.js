const postHandlerRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {createNewPost} = require('../Controllers/handleUploading')


postHandlerRouter.use(sessionHandler)
postHandlerRouter.post('/Post', createNewPost);
//postHandlerRouter.get('/feed', GetPostsFeed)

//
//postHandlerRouter.get("/logout", logout)
module.exports = postHandlerRouter