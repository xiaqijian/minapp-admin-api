var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});


class Mysql {
    constructor () {

    }
    query (name = 'javascript', limit = 20) {
      return new Promise((resolve, reject) => {
        const querytext ="SELECT * from "+name + ' limit '+limit;
        pool.query(querytext, function (error, results, fields) {
            if (error) {
                throw error
            };
            let data = {
              'sort': name,
              'data': results
            }
          resolve(data)
            // console.log('The solution is: ', results[0].solution);
        });
      })
       
    }
    queryId (name = 'javascript', id = '14776801081') {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * from '+name+' where BINARY id='+id, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            // console.log('The solution is: ', results[0].solution);
        });
      })
       
    }

}



module.exports = new Mysql()
