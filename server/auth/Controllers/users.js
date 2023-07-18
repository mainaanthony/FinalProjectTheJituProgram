const mssql = require('mssql')
const config = require('../Config/config')
const bcrypt = require('bcrypt')
const { newUserValidator } = require('..//validators/newUserValidator')
const  sendMailRegisterUser  = require('../utils/sendMailRegister')
const getAUser = require('../utils/getAUser')
const { v4 } = require("uuid");






module.exports = {




  loginUser: async (req, res) => {
    // Login validation
    const { loginInput, Password } = req.params;
  
    try {
      const pool = req.pool;
  
      if (pool.connected) {
        let results = await pool
          .request()
          .input("LoginInput", loginInput)
          .execute("UserLogin");
  
        // Check if the result set is empty
        if (!results.recordset || results.recordset.length === 0) {
          res.status(404).json({
            success: false,
            message: "Invalid email or username",
          });
          return;
        }
  
        let user = results.recordset[0];
  
        let password_match = await bcrypt.compare(Password, user.Password);
  
        if (password_match) {
          console.log("Welcome");
          req.session.authorized = true;
          req.session.user = user;
  
          res.status(200).json({ success: true, message: "Login Successful" });
        } else {
          res.status(404).json({
            success: false,
            message: "Password does not match",
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Error connecting to the database",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An error occurred during login",
      });
    }
  }
  ,


   logout: async(req, res)=>{
    console.log(req.pool.connected);

    req.session.destroy((err) =>{
        if(err){
            res.send("Error Logging out")
        } else {
            res.send("Logged Out successfully")
        }
    })
   },












    //create a new user
    postUser: async(req, res) =>{


        //const { Name, Email, Password, ContactNumber, DateOfBirth, Gender, Country} = req.body;
let user = req.body
console.log(user)
try{
let { value } = newUserValidator(user)
console.log(value)
let hashed_pwd = await bcrypt.hash(user.Password, 8)

const pool = req.pool
   if(pool.connected) {

     let results = await pool.request()
     .input("Name", value.Name )
     .input("Email", value.Email)
     .input("Password", hashed_pwd)
     .input("ContactNumber", value.ContactNumber)
     .input("UserName", value.UserName)
     .execute('CreateNewUserAuth')

     console.log(results)
     results.rowsAffected[0]> 0 ? res.send({ success: true, message: 'Saved User' }) :
     res.send({ success: false, message: 'An error occurred' })

     sendMailRegisterUser(value.Email, value.Name)

     

   }

} catch(error){
   
    console.log(error.message) //don't ever return an error this way which is the error returned by the ode as this exposes some details

}



    }



  
    



    
    
}