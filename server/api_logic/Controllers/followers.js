const mssql = require("mssql");
const  config  = require('../Config/config');


module.exports = {
       
     getFollowing: async(req, res)=>{
        try {

            const userName = req.session?.user.userName
            

            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('userName',userName )
    
               let result = await request.execute('GetUserFollowing');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "Retrieved users that you follow",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     },
     
     getFollowers: async(req, res)=>{

        try {

            const userName  = req.session?.user.userName
            

            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               
               
               request.input('userName', userName )
          

    
               let result = await request.execute('GetUserFollowers');
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


     getTotalFollowing: async(req, res)=>{
        try {

            const userName = req.session?.user.userName
            

            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('UserName',userName )
    
               let result = await request.execute('GetUserFollowingTotal');
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
     
     getTotalFollowers: async(req, res)=>{

        try {

            const userName  = req.session?.user.userName
            

            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               
               
               request.input('UserName', userName )
          

    
               let result = await request.execute('GetUserFollowersTotal');
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
            
            const FollowingUserName = req.session?.user.userName

            const { FollowedUserName } = req.body
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('FollowingUserName', FollowingUserName)//user who is doing the following
               request.input('FollowedUserName',FollowedUserName)//user being followed

    
               let result = await request.execute('RemoveFollowRelationship');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "You have removed successfully a follow relationship",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     }
,


     followUser: async(req, res)=>{
        try {
            
            const FollowingUserName = req.session?.user.userName

            const { FollowedUserName } = req.body
            let sql = await mssql.connect(config)
    
            if(sql.connected){
               const request = sql.request();
               
               request.input('FollowingUserName', FollowingUserName)//user who is doing the following
               request.input('FollowedUserName',FollowedUserName)//user being followed

    
               let result = await request.execute('AddFollowRelationship');
               console.log(result)
    
               res.json({
                   success: true,
                   message: "You have added successfully a follow relationship",
                   data: result.recordset
               })
            }
       } catch (error) {
           res.send(error.message)
           
       }
     }




}