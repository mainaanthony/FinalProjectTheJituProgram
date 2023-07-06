const mssql = require("mssql");
const  config  = require('../Config/config');


module.exports = {
       getFollowing: async(req, res)=>{
        try {
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('UserId', 71)
    
               let result = await request.execute('GetFollowedUsers');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "You have successfully Retrieved the users that you follow",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
       
       },

     getFollowers: async(req, res)=>{
        try {
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('UserId', 71)
    
               let result = await request.execute('GetFollowers');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "Retrieved users that follow you",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     },
     
     followUser: async(req, res)=>{

        try {
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('UserId', 71)
           request.input('FollowerUserId', 70)

    
               let result = await request.execute('GetFollowers');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "Retrieved users that follow you",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     },



     unfollowUser: async(req, res)=>{
        try {
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('UserId', 71)
           request.input('FollowerUserId', 70)

    
               let result = await request.execute('GetFollowers');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "Retrieved users that follow you",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     }



}