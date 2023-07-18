const commentRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {createNewComment, createRepliesPerComment,createDeleteComment, createRepliesCountPerComment, createCommentLike, createCountCommentsLikes} = require('../Controllers/comments')


commentRouter.use(sessionHandler)
commentRouter.post('/newComment', createNewComment);
commentRouter.post('/commentLike',createCommentLike)
commentRouter.get('/count', createRepliesCountPerComment)
commentRouter.get('/replies/:CommentID',createRepliesPerComment)
commentRouter.delete('/deleteComment',createDeleteComment)
commentRouter.get('/likesCount', createCountCommentsLikes)

//


module.exports = commentRouter