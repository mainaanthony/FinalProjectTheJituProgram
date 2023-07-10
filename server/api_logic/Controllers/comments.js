const mssql = require('mssql');
const config = require('../Config/config');


async function createNewComment(req, res) {
    const userName = req.session?.user.userName

  try {
    const { PostID,CommentText } = req.body;

    

    // Connect to the database
    await mssql.connect(config);

   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('UserName', userName);
    request.input('PostID', PostID);
    request.input('CommentText', CommentText);
    

    // Execute the stored procedure to create a new post
    await request.execute('CreateNewComment');

    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}



async function createDeleteComment(req, res) {
 

try {
  const { CommentID} = req.body;

 

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  
  request.input('commentId ', CommentID);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('SoftDeleteComment');

  res.status(201).json({ message: 'Comment Deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}


async function createCommentLike(req, res) {
  const userName = req.session?.user.userName

try {
  const { CommentID} = req.body;

  const LikedObjectType = 'Comment'

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  request.input('LikedByUserName', userName);
  request.input('LikedObjectType',LikedObjectType);
  request.input('LikedObjectID', CommentID);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('AddLikeOrDislike');

  res.status(201).json({ message: 'Comment Liked successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}


async function createRepliesPerComment(req, res) {
 

try {
  const { CommentID} = req.body;

 

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  
  request.input('commentId', CommentID);
  
 
  

  // Execute the stored procedure to create a new post
  let results = await request.execute('ViewCommentReplies');

  res.status(201).json({ 
    message: 'This is the  replies in this comment',
    result: results.recordset
   });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}

async function createRepliesCountPerComment(req, res) {
 

  try {
    const { CommentID} = req.body;
  
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    
    request.input('CommentID', CommentID);
   
   
    
  
    // Execute the stored procedure to create a new post
     let results = await request.execute('CountRepliesPerComment');
  
    res.status(201).json({ 
      message: 'This is the  replies  count in this comment',
      results: results.recordset[0].ReplyCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }



  async function createCountCommentsLikes(req, res) {
 

    try {
      const {commentID} = req.body;
    
     
    
      // Connect to the database
      await mssql.connect(config);
    
     
      // Insert the new post into the "posts" table
      const request = new mssql.Request();
    
      
      request.input('commentID', commentID);
      
     
     
      
    
      // Execute the stored procedure to create a new post
     let results = await request.execute('CountActiveCommentLikes');
    
      res.status(201).json({
         message: 'This is the number of likes in this comment',
         results: results.recordset[0]
        });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      // Close the database connection
      mssql.close();
    }
    }
    
    




module.exports = { createNewComment , createCommentLike, createDeleteComment, createRepliesCountPerComment, createRepliesPerComment, createCountCommentsLikes };
