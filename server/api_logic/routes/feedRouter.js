const feedRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {GetPostsFeed,GetPostPerUser, GetPostPerUserBySearch } = require('../Controllers/feed')


feedRouter.use(sessionHandler)
feedRouter.get('/userPosts', GetPostPerUser);
feedRouter.get('/feed',GetPostsFeed)
feedRouter.get('/userPostsSearch', GetPostPerUserBySearch);



module.exports = feedRouter