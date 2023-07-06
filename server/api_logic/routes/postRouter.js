const postRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {GetPostsFeed,GetPostPerUser, logout } = require('../Controllers/posts')


postRouter.use(sessionHandler)
postRouter.get('/userPosts', GetPostPerUser);
postRouter.get('/feed',GetPostsFeed)


postRouter.get("/logout", logout)
module.exports = postRouter