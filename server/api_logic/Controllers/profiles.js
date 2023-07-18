const mssql = require('mssql');
const config = require('../Config/config');
const bcrypt = require('bcrypt')
const { uploadImage, uploadVideo } = require('../utils/uploaderUtil');

async function updateProfilePic(req, res) {
  try {
    const {   ImageUrl } = req.body;
    const userID = req.session?.user.UserID
    // console.log(userID)

    // // Connect to the database
    // await mssql.connect(config);

    // // Upload the image and video (if provided) and get the secure URLs
    // let imageSecureUrl = '';
    

    // if (ImageUrl) {
    //   imageSecureUrl = await uploadImage(ImageUrl);
    //   console.log(imageSecureUrl)

    // }

   

    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('userId', userID );
    request.input('newProfilePicUrl', ImageUrl);
    

    // Execute the stored procedure to create a new post
     let results = await request.execute('UpdateProfilePicUrl');

    res.status(201).json({
       message: 'Profile updated successfully',
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

async function updateProfileBio(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    const { Bio} = req.body;
  
    
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    request.input('userId', userID );
    request.input('newBio',Bio);
    
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('UpdateProfileBio');
  
    res.status(201).json({ message: 'User Biography updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }
  

  async function updateUserAccountOptions(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    const { newAccountOptions} = req.body;
  
    
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    request.input('userId', userID );
    request.input(' newAccountOptions', newAccountOptions);
    
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('UpdateAccountOptions');
  
    res.status(201).json({ message: 'User Account Options updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }




  async function updatePassword(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    const { newPassword} = req.body;
  
    let hashed_pwd = await bcrypt.hash(newPassword, 8)
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    request.input('userId', userID );
    request.input('newPassword', hashed_pwd);
    
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('changePassword');
  
    res.status(201).json({ message: 'User password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }


  async function updateUserName(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    const { newUserName} = req.body;
  
    
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    request.input('userId', userID );
    request.input(' newUserName', newUserName);
    
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('ChangeUserName');
  
    res.status(201).json({ message: 'User username updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }

  async function updateUserEmail(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    const { newEmail} = req.body;
  
    
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    request.input('userId', userID );
    request.input(' newEmail', newEmail);
    
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('ChangeEmail');
  
    res.status(201).json({ message: 'User username updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }


  async function createDeleteAccount(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    
  
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('userId', userID);
   
    
  
    // Execute the stored procedure to create a new post
    await request.execute('SoftDeleteUser');
  
    res.status(201).json({ message: 'Profile Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }


  async function createSearchProfileUserName(req, res) {
    const userID = req.session?.user.userName
  
  try {
    
    const {userName} = req.body
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('SearchTerm', userName);
   
    
  
    // Execute the stored procedure to create a new post
    let results = await request.execute('SearchUsersByUsername');
  
    res.status(201).json({
       message: 'Users that match the term', 
       results: results
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
  }





module.exports = {updateProfilePic, updatePassword, updateUserAccountOptions, updateProfileBio, updateUserEmail, updateUserName, createDeleteAccount, createSearchProfileUserName}
