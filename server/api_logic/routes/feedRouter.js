const feedRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {GetPostsFeed,GetPostPerUser, GetPostPerUserBySearch, GetPostTest, getUserInfo} = require('../Controllers/feed')


feedRouter.use(sessionHandler)
feedRouter.get('/userPosts', GetPostPerUser);
feedRouter.get('/feed',GetPostsFeed)
feedRouter.get('/feedTest', GetPostTest)
feedRouter.get('/userPostsSearch', GetPostPerUserBySearch);
feedRouter.get('/info', getUserInfo)



module.exports = feedRouter