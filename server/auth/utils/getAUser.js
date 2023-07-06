const mssql = require('mssql')
const config = require('../Config/config')


async function getAUser(loginInput, pool){


    //let sql =  await mssql.connect(config)


    if(pool.connected){
        const pool = req.pool;
        try{
            let results = await pool.request()
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