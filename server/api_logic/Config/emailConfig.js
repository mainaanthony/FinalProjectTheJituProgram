require('dotenv')
const email_config = {
    service: 'gmail',
    //host : 'smtp.gmail.com'

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PWD
    },
}

module.exports = email_config