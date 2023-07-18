const express = require('express')
require('dotenv').config()
const app = express()
const config = require('./Config/config')
const cors = require('cors')
const  { v4 } = require("uuid")
const sql = require('mssql');
const session = require("express-session");
const RedisStore = require('connect-redis').default
const {createClient} = require('redis')
//const cookieParser = require('cookie-parser'); // Add this line
//const { secure } = require("../auth/Config/emailConfig");


app.use(cors({
        origin:'http://localhost:3000',
        credentials:true,
        optionsSuccessStatus:200
}))
app.use(express.json())



//routers 
const userRouter = require('../auth/routes/userRouter')
const { truncate } = require('fs')


const pool = new sql.ConnectionPool(config)
async function startApp(){
//useRoutes


try{
        await pool.connect();
        console.log("App Connected to database");
        app.use((req, res, next) => {
                req.pool = pool;
                next();
        })
    
        const redisClient =  createClient();
        redisClient.connect()
        console.log("Connected to Redis")


        const redisStore = new RedisStore({

                client: redisClient,
                prefix: ''
        })


        //sessions
const oneDay = 1000 * 60 * 60 * 24
app.use(session({
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        genid: () => v4(),
        rolling: true,
        unset: 'destroy',
       
        cookie: {
                maxAge: oneDay,
                httpOnly: false,
                secure: false,
                domain: 'localhost'
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


} catch(error){
        console.log("Error connecting to database")
    console.log(error)
}








}

startApp()