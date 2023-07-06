const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const  { v4 } = require("uuid")
const session = require("express-session");
const RedisStore = require('connect-redis').default
const {createClient} = require('redis')
//const cookieParser = require('cookie-parser'); // Add this line
//const { secure } = require("../auth/Config/emailConfig");


app.use(cors())
app.use(express.json())



//routers 
const userRouter = require('../auth/routes/userRouter')
const { truncate } = require('fs')



async function startApp(){
//useRoutes









//sessions
const oneDay = 1000 * 60 * 60 * 24
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        genid: () => v4(),
        cookie: {
                maxAge: oneDay,
                httpOnly: false,
                secure: false
        }
}))


app.get('/', (req,res, next)=>{
        let cont = true
        if(cont){
                console.log("logged in successfully from the middleware")
                next()
        } else{
            res.send("Validation error")  
        }
},
(req, res) =>{

        res.send("Ok")
        

})


app.use('/users', userRouter)

app.use("*",(req,res, next)=>{
   
        const error = new Error("Route not found")
        next({
             status:404,
             message: error
        })
        
   })
   
   app.use((error, req, res, next)=>{
        res.status(error.status).json(error.message.message)
   })
   

const port = process.env.PORT || 5050


app.listen(port, ()=>console.log(`Server running on port ${port}`))


}

startApp