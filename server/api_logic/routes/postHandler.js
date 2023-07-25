const postHandlerRouter = require('express').Router()
const { sessionHandler } = require('../middlewares/sessionHandler')



const {createNewPost, createCommentsCountPerPost, createDeletePost, createCommentsPerPost, createPostLike, createCountPostsLikes} = require('../Controllers/posts')


postHandlerRouter.use(sessionHandler)
postHandlerRouter.post('/Post', createNewPost);
postHandlerRouter.post('/postLike',createPostLike)
postHandlerRouter.get('/count', createCommentsCountPerPost)
postHandlerRouter.get('/comments/:PostID', createCommentsPerPost)
postHandlerRouter.delete('/deletePost/:postId',createDeletePost)
postHandlerRouter.get('/likesCount', createCountPostsLikes)

//
//postHandlerRouter.get("/logout", logout)
module.exports = postHandlerRouter