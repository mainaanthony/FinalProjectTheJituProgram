const mssql = require('mssql')
const config = require('../Config/config')
const bcrypt = require('bcrypt')
//const { newUserValidator } = require('..//validators/newUserValidator')
const  sendMailRegisterUser  = require('../utils/sendMailRegister')
//const getAUser = require('../utils/getAUser')
const { v4 } = require("uuid");






module.exports = {


  logout: async(req, res)=>{
    console.log(req.session)

    req.session.destroy((err) =>{
        if(err){
            res.send("Error Logging out")
        } else {
            res.send("Logged Out successfully")
        }
    })
   },

  GetPostsFeed: async(req, res) => {
       

        try{

           let sql = await mssql.connect(config)

           if(sql.connected){

         let userID = req.session?.user.userId   

        const request = sql.request()

        const userId = '129A0BBF-08CA-4DAC-892A-074ED0EFF489';

         request.input('userId', userId)  
         
         let result = await request.execute('GetPostsByFollowing')
         console.log(result)

         res.json({
              success: true,
              message: "These are the posts to the users the user Follows",
              result: result.recordset
         })

           }


        }catch(error){

       res.send(error.message)

        }

   },


   createPost: async(req, res)=>{
    console.log(req.session)

    req.session.destroy((err) =>{
        if(err){
            res.send("Error Logging out")
        } else {
            res.send("Logged Out successfully")
        }
    })
   },












    //create a new user
  GetPostPerUser: async(req, res) =>{
         try{

        let sql = await mssql.connect(config)

        if(sql.connected){
          const request = sql.request()
          const userId = '129A0BBF-08CA-4DAC-892A-074ED0EFF489';

          request.input('userId', userId)  

          let result = await request.execute('ViewUserPosts')
          console.log(result)

          res.json({

            success: true,
            message: "Successfully retrieved posts per specific user",
            result: result.recordset
          })

        }

         }catch(error){
           
       res.send(error.message)

         }      

    }



    //login user
   
    



    
    
}