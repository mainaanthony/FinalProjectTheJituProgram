const mssql = require('mssql');
const config = require('../Config/config');


async function createNewReply(req, res) {
    const userName = req.session?.user.userName

  try {
    const { PostID,CommentID,ReplyText } = req.body;

    

    // Connect to the database
    await mssql.connect(config);

   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('UserName', userName);
    request.input('PostID', PostID);
    request.input('CommentID', CommentID);
    request.input('ReplyText', ReplyText);
    

    // Execute the stored procedure to create a new post
    await request.execute('CreateNewReply');

    res.status(201).json({ message: 'Reply created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}



async function createNewReplyLike(req, res) {
  const userName = req.session?.user.userName

try {
  const { replyID} = req.body;

  const LikedObjectType = 'Reply'

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  request.input('LikedByUserName', userName);
  request.input('LikedObjectType',LikedObjectType);
  request.input('LikedObjectID', replyID);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('AddLikeOrDislike');

  res.status(201).json({ message: 'Reply Liked successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}


async function createDeleteReply(req, res) {
  const userName = req.session?.user.userName

try {
  const { replyID} = req.body;

 

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  
  request.input('replyId', replyID);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('SoftDeleteReply');

  res.status(201).json({ message: 'Reply Deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}


async function createCountRepliesLikes(req, res) {
 

  try {
    const {replyID} = req.body;
  
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('replyID',replyID);
    
   
   
    
  
    // Execute the stored procedure to create a new post
   let results = await request.execute('CountActiveReplyLikes');
  
    res.status(201).json({
       message: 'This is the number of likes in this reply',
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
  
  







module.exports = { createNewReply, createNewReplyLike,createCountRepliesLikes, createDeleteReply };
