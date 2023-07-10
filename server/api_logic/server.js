const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const  { v4 } = require("uuid")
const session = require("express-session");
//const cookieParser = require('cookie-parser'); // Add this line
//const { secure } = require("../auth/Config/emailConfig");

app.use(cors())
app.use(express.json())



//routers 
const feedRouter = require('./routes/feedRouter')
const postHandlerRouter = require('./routes/postHandler')
const followRouter = require('./routes/followRouter')
const commentRouter = require('./routes/commentsRouter')
const replyRouter = require('./routes/replyRouter')
const notificationsRouter = require('./routes/notificationsRouter')
const profileRouter = require('./routes/profileRouter')
const { truncate } = require('fs')




//useRoutes


//sessions
// const oneDay = 1000 * 60 * 60 * 24
// app.use(session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         genid: () => v4(),
//         cookie: {
//                 maxAge: oneDay,
//                 httpOnly: false,
//                 secure: false
//         }
// }))


// app.get('/', (req,res, next)=>{
//         let cont = true
//         if(cont){
//                 console.log("logged in successfully from the middleware")
//                 next()
//         } else{
//             res.send("Validation error")  
//         }
// },
// (req, res) =>{

//         res.send("Ok")
        

// })

app.use('/aboutFollow', followRouter)
app.use('/posts', feedRouter)
app.use('/new', postHandlerRouter)
app.use('/comments', commentRouter)
app.use('/replies', replyRouter)
app.use('/profile', profileRouter)
app.use('/notify',notificationsRouter)

// app.use("*",(req,res, next)=>{
   
//         const error = new Error("Route not found")
//         next({
//              status:404,
//              message: error
//         })
        
//    })
   
//    app.use((error, req, res, next)=>{
//         res.status(error.status).json(error.message.message)
//    })

app.get('/', (req, res)=>{
        res.send("ok")
})
   

const port = process.env.PORT || 5050


app.listen(port, ()=>console.log(`Server running on port ${port}`))