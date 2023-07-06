const followRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const { getFollowing, getFollowers} = require('../Controllers/followers')


followRouter.use(sessionHandler)
followRouter.get('/following', getFollowing);
followRouter.get('/followers',getFollowers)



module.exports = followRouter