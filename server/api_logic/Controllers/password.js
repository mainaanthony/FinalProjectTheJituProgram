const mssql = require('mssql');
const Joi = require('joi');
const config = require('../Config/config');
const bcrypt = require('bcrypt')
const { uploadImage, uploadVideo } = require('../utils/uploaderUtil');

async function updatePassword(req, res) {
    const userID = req.session?.user.UserID;
  
    try {
      const { nowPassword, newPassword, confirmPassword } = req.params;
  
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










  async function feedSpecific(req, res) {
    const {userID} = req.params
  
    try{

      let sql = await mssql.connect(config)

      if(sql.connected){

    // let userID = req.session?.user.UserID   

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


   }catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      // Close the database connection
      mssql.close();
    }
  }
  


  async function feedSpecificInfo(req, res) {
    const {userID} = req.params
  
    try {
      const sql = await mssql.connect(config);
  
      if (sql.connected) {
        // const userID = req.session?.user.UserID;
  
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
    }catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      // Close the database connection
      mssql.close();
    }
  }
  
  
  
  
  
  
module.exports = { updatePassword, feedSpecific, feedSpecificInfo}
