const notificationsRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const { createDisplayNotificationPerUser, createMarkNotificationAsReadOnView } = require('../Controllers/notifications')


notificationsRouter.use(sessionHandler)
notificationsRouter.get('/displayNotification', createDisplayNotificationPerUser);
 notificationsRouter.get('/markRead',createMarkNotificationAsReadOnView)
// notificationsRouter.get('/count', createCommentsCountPerPost)
// notificationsRouter.get('/comments', createCommentsPerPost)
// notificationsRouter.delete('/deletePost',createDeletePost)
//postHandlerRouter.get('/feed', GetPostsFeed)

//
//postHandlerRouter.get("/logout", logout)
module.exports = notificationsRouter