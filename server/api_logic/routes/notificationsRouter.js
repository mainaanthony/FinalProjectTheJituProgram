const notificationsRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const { createDisplayNotificationPerUser,createMarkAllNotificationsAsReadOnView, createMarkNotificationAsReadOnView } = require('../Controllers/notifications')


notificationsRouter.use(sessionHandler)
notificationsRouter.get('/displayNotification', createDisplayNotificationPerUser);
 notificationsRouter.post('/markRead',createMarkNotificationAsReadOnView)
 notificationsRouter.post('/allRead', createMarkAllNotificationsAsReadOnView)
// notificationsRouter.get('/comments', createCommentsPerPost)
// notificationsRouter.delete('/deletePost',createDeletePost)
//postHandlerRouter.get('/feed', GetPostsFeed)

//
//postHandlerRouter.get("/logout", logout)
module.exports = notificationsRouter