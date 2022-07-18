// Module Mysql
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

// Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: 'data_base'
});

// Valide Connection
connection.connect((error)=>{
    if(error){
        console.log('ERROR CONNECT ' + error);
        return;
    } 
    else {
        console.log('CONNECTED MYSQL SERVER. Successfully')
    }
})

// Export Module
module.exports = connection;