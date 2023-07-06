const mssql = require('mssql')
const config = require('../Config/config')
const bcrypt = require('bcrypt')
const { newUserValidator } = require('..//validators/newUserValidator')
const  sendMailRegisterUser  = require('../utils/sendMailRegister')
const getAUser = require('../utils/getAUser')
const { v4 } = require("uuid");






module.exports = {




    loginUser: async(req, res) => {
        // Login validation
 
   let sql = await mssql.connect(config);
   if (sql.connect) {
       const { loginInput, Password } = req.params
       console.log(req.body)

       let user = await getAUser(loginInput)
       console.log(user)
       console.log(user.Password)
       if (user) {
           let password_match = await bcrypt.compare(Password,user.Password)
           if(password_match ){
             console.log("welcome") 
            req.session.authorized = true
            req.session.user = user


            //crazy start
            


            
          


            //crazy end
            res.status(200).json({ success: "true", message: "Login Successful" })
                      
         
           }else{res.status(404).json({
                    success: "false",
                    message: "Password does not match"
                })
               } 
       } else {
         res.status(404).json({
           success: false,
           message: "No user found"
         });
       }
     } 
    else {
     res.status(404).json({
       success: false,
       message: "Internal Server problem"
     });
   }
   },


   logout: async(req, res)=>{
    console.log(req.session)

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
let sql = await mssql.connect(config)
   if(sql.connected) {

     let results = await sql.request()
     .input("Name", value.Name )
     .input("Email", value.Email)
     .input("Password", hashed_pwd)
     .input("ContactNumber", value.ContactNumber)
     .input("DateOfBirth", value.DateOfBirth)
     .input("Gender", value.Gender)
     .input("Country", value.Country)
     .execute('CreateNewUser')

     console.log(results)
     results.rowsAffected[0]> 0 ? res.send({ success: true, message: 'Saved User' }) :
     res.send({ success: false, message: 'An error occurred' })

     sendMailRegisterUser(value.Email, value.Name)

     

   }

} catch(error){
   
    console.log(error.message) //don't ever return an error this way which is the error returned by the ode as this exposes some details

}



    }



    //login user
   
    



    
    
}