const mssql = require('mssql')
const config = require('../Config/config')
const bcrypt = require('bcrypt')
//const { newUserValidator } = require('..//validators/newUserValidator')
const  sendMailRegisterUser  = require('../utils/sendMailRegister')
//const getAUser = require('../utils/getAUser')
const { v4 } = require("uuid");






module.exports = {


  
  GetPostsFeed: async(req, res) => {
       

        try{

           let sql = await mssql.connect(config)

           if(sql.connected){

         let userID = req.session?.user.UserID   

        const request = sql.request()

       // const userId = '129A0BBF-08CA-4DAC-892A-074ED0EFF489';

         request.input('userId', userID)  
         
         let result = await request.execute('GetPostsByFollowing')
         console.log(result)

         res.json({
              success: true,
              message: "These are the posts to the users, the user Follows",
              result: result.recordset[0]
         })

           }


        }catch(error){

       res.send(error.message)

        }

   },


   












    //create a new user
  GetPostPerUser: async(req, res) =>{
         try{

        let sql = await mssql.connect(config)
        let userID = req.session?.user.UserID   
        console.log(userID)
        if(sql.connected){
          const request = sql.request()
         
          
          request.input('userId',userID)  

          let result = await request.execute('ViewUserPosts')
          console.log(result)

          res.json({

            success: true,
            message: "Successfully retrieved posts per specific user ",
            result: result.recordset[0]
          })

        }

         }catch(error){
           
       res.send(error.message)

         }      

    },



    //login user
    //create a new user
    GetPostPerUserBySearch: async(req, res) =>{
      try{

     let sql = await mssql.connect(config)
     let {userID} =   req.body
     console.log(userID)
     if(sql.connected){
       const request = sql.request()
      
       
       request.input('userId',userID)  

       let result = await request.execute('ViewUserPosts')
       console.log(result)

       res.json({

         success: true,
         message: "Successfully retrieved posts per specific user ",
         result: result.recordset[0]
       })

     }

      }catch(error){
        
    res.send(error.message)

      }      

 }



   
    



    
    
}