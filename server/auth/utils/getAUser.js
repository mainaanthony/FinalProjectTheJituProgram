const mssql = require('mssql')
const config = require('../Config/config')


async function getAUser(loginInput){


    let sql =  await mssql.connect(config)


    if(sql.connected){

        try{
            let results = await sql.request()
            .input("LoginInput", loginInput)
            .execute("UserLogin")

            let user = results.recordset[0];
            return user
        }catch(error){
 
            console.error('Error retrieving user from database: ', error);
            return null;
        }
    } else{
        return null
    }
  
}

module.exports = getAUser