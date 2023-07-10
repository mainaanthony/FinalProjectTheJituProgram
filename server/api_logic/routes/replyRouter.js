const replyRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {createNewReply, createNewReplyLike,createCountRepliesLikes, createDeleteReply} = require('../Controllers/replies')


replyRouter.use(sessionHandler)
replyRouter.post('/newReply', createNewReply);
replyRouter.post('/replyLike', createNewReplyLike);
replyRouter.delete('/delete', createDeleteReply);
replyRouter.get('/likesCount', createCountRepliesLikes)



module.exports = replyRouter