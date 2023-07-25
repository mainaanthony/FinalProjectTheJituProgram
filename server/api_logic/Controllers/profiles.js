const mssql = require('mssql');
const Joi = require('joi');
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




  // async function updatePassword(req, res) {
  //   const userID = req.session?.user.UserID
  
  // try {
  //   const { newPassword} = req.body;
  
  //   let hashed_pwd = await bcrypt.hash(newPassword, 8)
  
  //   // Connect to the database
  //   await mssql.connect(config);
  
   
  //   // Insert the new post into the "posts" table
  //   const request = new mssql.Request();
  
  //   request.input('userId', userID );
  //   request.input('newPassword', hashed_pwd);
    
   
    
  
  //   // Execute the stored procedure to create a new post
  //   await request.execute('changePassword');
  
  //   res.status(201).json({ message: 'User password updated successfully' });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Internal server error');
  // } finally {
  //   // Close the database connection
  //   mssql.close();
  // }
  // }



 



async function updatePassword(req, res) {
  const userID = req.session?.user.UserID;

  try {
    const { nowPassword, newPassword, confirmPassword } = req.body;

    // Input validation using Joi
    const schema = Joi.object({
      nowPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    });
//
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const currentPassword = req.session?.user.Password;

    // Compare the input password with the stored encrypted password
    const passwordMatch = await bcrypt.compare(nowPassword, currentPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPwd = await bcrypt.hash(newPassword, 8);

    // Connect to the database
    await mssql.connect(config);

    // Insert the new post into the "posts" table
    const request = new mssql.Request();
    request.input('userId', userID);
    request.input('newPassword', hashedPwd);

    // Execute the stored procedure to change the password
    await request.execute('changePassword');
    console.log("These are the passwords" + nowPassword + newPassword + confirmPassword)
    res.status(201).json({ message: 'User password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}





//   async function changePassword(req, res){
//     const UserId = req.session?.user.UserId;
//   const { pool } = req;
//   const { currentPassword, newPassword } = req.body;

//   try {
//     if (pool.connected) {
//       let passwords_match = await bcrypt.compare(
//         currentPassword,
//         req.session?.user.Password
//       );

//       let newPassword_hashed =  await bcrypt.hash(newPassword, 8);
//       if (passwords_match) {
//         const request = pool.request();
//         request.input('UserId', UserId)
//                 .input('NewPassword', newPassword_hashed)

//         let result = await request.execute('ChangePassword');
//         console.log(result);

//         if (result.rowsAffected[0] > 0) {          

//           res.json({
//             success: true,
//             message: 'Successfully changed your password',
//           });
//         }
//       } else {
//         res.status(401).send('wrong password');
//       }
//     }
//   } catch (error) {
//     res.send(error.message);
//   }

// }






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


  async function getAUser(req, res) {
    const userID = req.session?.user.UserID
  
  try {
    
  
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('userId', userID);
   
    
  
    // Execute the stored procedure to create a new post
   let results =  await request.execute('GetUserProfile');


  
    res.status(201).json({
       message: 'Profile Details received successfully',
       results: results.recordset
      
      });
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
    
    const {userName} = req.params
   
  
    // Connect to the database
    await mssql.connect(config);
  
   
    // Insert the new post into the "posts" table
    const request = new mssql.Request();
  
    
    request.input('SearchTerm', userName);
   
    
  
    // Execute the stored procedure to create a new post
    let results = await request.execute('SearchUsersByUsername');
  
    res.status(201).json({
       message: 'Users that match the term', 
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


  ///new profile udated code
  async function updateProfile(req, res) {
    try {
      const { profilePicUrl, bio, dateOfBirth, gender, country, userName } = req.body;
      // const UserID = req.session?.user?.UserID;
      const UserID = req.session?.user.UserID
      console.log(bio)
      // Check if UserID is available in the session
      if (!UserID) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      // Connect to the database
      await mssql.connect(config);
  
      // Create a new instance of mssql.Request()
      const request = new mssql.Request();
  
      // Set the input parameters for the stored procedure
      request.input('UserID', UserID);
      request.input('profilePicUrl', profilePicUrl);
      request.input('bio', bio);
      request.input('dateOfBirth', dateOfBirth);
      request.input('gender', gender);
      request.input('country', country);
      request.input('userName', userName);
  
      // Execute the stored procedure to update the user profile
      const results = await request.execute('UpdateUserProfileAll');
       console.log(results)
      // Check if the stored procedure returned an error message
      if (results.returnValue !== 0) {
        // The stored procedure returned an error message
        return res.status(400).json({ error: results.output.message });
      }
  
      // Return a success message
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      // Handle specific error cases, if necessary
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Close the database connection (if it's open)
      if (mssql.connected) {
        mssql.close();
      }
    }
  }
  




module.exports = {updateProfilePic,getAUser,updateProfile, updatePassword, updateUserAccountOptions, updateProfileBio, updateUserEmail, updateUserName, createDeleteAccount, createSearchProfileUserName}
