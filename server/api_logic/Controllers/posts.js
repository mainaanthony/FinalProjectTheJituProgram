const mssql = require('mssql');
const config = require('../Config/config');
const { uploadImage, uploadVideo } = require('../utils/uploaderUtil');

async function createNewPost(req, res) {
  try {
    const {  PostText, ImageUrl, VideoUrl } = req.body;
    const userName = req.session?.user.userName
    

    // Connect to the database
    await mssql.connect(config);

    // Upload the image and video (if provided) and get the secure URLs
    // let imageSecureUrl = '';
    // let videoSecureUrl = '';

    // if (ImageUrl) {
    //   imageSecureUrl = await uploadImage(ImageUrl);
    //   console.log(imageSecureUrl)

    // }

    // if (VideoUrl) {
    //   videoSecureUrl = await uploadVideo(VideoUrl);
    // }

    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('UserName', userName);
    request.input('PostText', PostText);
    request.input('ImageUrl', ImageUrl);
    request.input('VideoUrl', VideoUrl);

    // Execute the stored procedure to create a new post
     let results = await request.execute('CreateNewPost');

    res.status(201).json({
       message: 'Post created successfully',
      reults: results
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}


async function createPostLike(req, res) {
  const userName = req.session?.user.userName

try {
  const { PostID} = req.body;

  const LikedObjectType = 'Post'

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  request.input('LikedByUserName', userName);
  request.input('LikedObjectType',LikedObjectType);
  request.input('LikedObjectID', PostID);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('AddLikeOrDislike');

  res.status(201).json({ message: 'Post Liked successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}


async function createDeletePost(req, res) {
 

try {
  const {postId} = req.params;

 

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  
  request.input('postId', postId);
 
  

  // Execute the stored procedure to create a new post
  await request.execute('SoftDeletePost');
  console.log(postId)

  res.status(201).json({ message: 'Post Deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}





async function createCommentsCountPerPost(req, res) {
 

try {
  const { PostID} = req.body;

 

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  
  request.input('postId', PostID);
  
 
 
  

  // Execute the stored procedure to create a new post
 let results = await request.execute('CountCommentsPerPost');

  res.status(201).json({
     message: 'This is the number of comments in this post',
     results: results.recordset[0].CommentCount
    });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}



async function createCommentsPerPost(req, res) {
 //cc

  try {
    const { PostID} = req.params;
  
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('postId',PostID);
    
   
   
    
  
    // Execute the stored procedure to create a new post
    let results = await request.execute('ViewPostCommentsWithStats');
    console.log(results)
  
    res.status(201).json({ 
      message: 'This is the comments in this post',
      results: [...results.recordset]
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }
  

  async function createCountPostsLikes(req, res) {
 

    try {
      const {postID} = req.body;
    
     
    
      // Connect to the database
      await mssql.connect(config);
    
     
      // Insert the new post into the "posts" table
      const request = new mssql.Request();
    
      
      request.input('postId', postID);
      
     
     
      
    
      // Execute the stored procedure to create a new post
     let results = await request.execute('CountActivePostLikes');
    
      res.status(201).json({
         message: 'This is the number of likes in this post',
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
    
    



module.exports = { createNewPost, createPostLike, createDeletePost, createCommentsCountPerPost, createCommentsPerPost, createCountPostsLikes };
