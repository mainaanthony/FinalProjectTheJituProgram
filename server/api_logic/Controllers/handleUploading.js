const mssql = require('mssql');
const config = require('../Config/config');
const { uploadImage, uploadVideo } = require('../utils/uploaderUtil');

async function createNewPost(req, res) {
  try {
    const { UserEmail, PostText, ImageUrl, VideoUrl } = req.body;

    

    // Connect to the database
    await mssql.connect(config);

    // Upload the image and video (if provided) and get the secure URLs
    let imageSecureUrl = '';
    let videoSecureUrl = '';

    if (ImageUrl) {
      imageSecureUrl = await uploadImage(ImageUrl);
      console.log(imageSecureUrl)

    }

    if (VideoUrl) {
      videoSecureUrl = await uploadVideo(VideoUrl);
    }

    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('UserEmail', UserEmail);
    request.input('PostText', PostText);
    request.input('ImageUrl', imageSecureUrl);
    request.input('VideoUrl', videoSecureUrl);

    // Execute the stored procedure to create a new post
    await request.execute('CreateNewPost');

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}

module.exports = { createNewPost };
