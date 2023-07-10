const nodemailer = require('nodemailer')
require('dotenv').config()
const email_config = require('../Config/emailConfig')


const transporter = nodemailer.createTransport(email_config)


async function sendMailRegisterUser(email, name){

const messageOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "welcome to Notified App",
    text:
    `Dear ${name},

    We are delighted to welcome you to the Notified Social App,
    Notified Team`

    
}

try {
    let results = await transporter.sendMail(messageOptions)
    console.log(results)
}catch(error){
     console.log(error)
}


}
module.exports = sendMailRegisterUser