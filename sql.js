const until=require("util");
const mysql=require("mysql2");


const mysqlConnection=mysql.createConnection({//אובייקט חיבור לדאטהבייס
    host:'localhost',
    user:'root',
    password:'192003',
    database:'nadlan',
    multipleStatements:true
})
const promiseQuery=(sql)=>{//פונק שיודעת לשלוח שאילתה ולהחזיר תגובה
    return until.promisify(mysqlConnection.query).call(mysqlConnection,sql);
}
module.exports={mysqlConnection,promiseQuery};
