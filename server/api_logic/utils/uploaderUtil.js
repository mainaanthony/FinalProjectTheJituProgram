const cloudinary = require('cloudinary').v2;
require('dotenv').config()


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });


const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Image upload failed');
  }
};

const uploadVideo = async (videoPath) => {
  const options = {
    resource_type: 'video'
  };

  try {
    const result = await cloudinary.uploader.upload(videoPath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Video upload failed');
  }
};

module.exports = { uploadImage, uploadVideo };
