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
              result: result
         })

           }


        }catch(error){

       res.send(error.message)

        }

   },


   


  //create a new user
   GetPostTest:  async (req, res) => {
    try {
      const sql = await mssql.connect(config);
  
      if (sql.connected) {
        const userID = req.session?.user.UserID;
  
        const request = sql.request();
  
        request.input('userId', userID);
  
        const result = await request.execute('GetPostsByUserIdFourth');
        console.log(result);
  
        // Extract the necessary data from the result
        // Extract the necessary data from the result
      // const posts = result.recordset;
      // const postFeed = JSON.parse(posts);
      // console.log("Hellooo" + postFeed)

      // const postFeed = posts.map((post) => {
      //   console.log('Raw Post:', post); // Add this line for debugging
      
      //   const parsedComments = JSON.parse(post.Comments);
      //   console.log('Parsed Comments:', parsedComments); // Add this line for debugging
      
      //   const comments = parsedComments.map((comment) => {
      //     console.log('Raw Comment:', comment); // Add this line for debugging
      
      //     const parsedReplies = JSON.parse(comment.Replies);
      //     console.log('Parsed Replies:', parsedReplies); // Add this line for debugging
      
      //     const replies = parsedReplies.map((reply) => {
      //       console.log('Raw Reply:', reply); // Add this line for debugging
      
      //       return {
      //         replyId: reply.replyId,
      //         replyText: reply.replyText,
      //         totalLikes: reply.totalLikes,
      //       };
      //     });
      
      //     return {
      //       commentId: comment.commentId,
      //       commentText: comment.commentText,
      //       totalLikes: comment.totalLikes,
      //       totalReplies: comment.totalReplies,
      //       replies: replies,
      //     };
      //   });
      
      //   return {
      //     postId: post.PostId,
      //     content: post.PostContent,
      //     imageUrl: post.PostImageUrl,
      //     videoUrl: post.PostVideoUrl,
      //     author: {
      //       userName: post.AuthorUserName,
      //       name: post.AuthorName,
      //       profilePic: post.AuthorProfilePic,
      //     },
      //     totalComments: post.TotalComments,
      //     totalLikes: post.TotalLikes,
      //     comments: comments,
      //   };
      // });
      
        res.json({
          success: true,
          message: "These are the posts that the user follows",
          postFeed:result.recordset[0],
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  
  ,

  getUserInfo : async (req, res) => {
    try {
      const sql = await mssql.connect(config);
  
      if (sql.connected) {
        const userID = req.session?.user.UserID;
  
        const request = sql.request();
  
        request.input('userId', userID);
  
        const result = await request.execute('GetUserInformation');
        console.log(result);
  
        res.json({
          success: true,
          message: "User information retrieved successfully",
          result: result.recordset[0]
        });
      }
    } catch (error) {
      res.send(error.message);
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