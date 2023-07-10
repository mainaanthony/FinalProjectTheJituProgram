const followRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const { getFollowing, getFollowers,  getTotalFollowing,getTotalFollowers,  unfollowUser, followUser } = require('../Controllers/followers')


followRouter.use(sessionHandler)
followRouter.get('/following', getFollowing);
followRouter.get('/followers',getFollowers)
followRouter.post('/follow', followUser)
followRouter.post('/unfollow', unfollowUser)
followRouter.get('/totalFollowers', getTotalFollowers)
followRouter.get('/totalFollowing', getTotalFollowing)


module.exports = followRouter