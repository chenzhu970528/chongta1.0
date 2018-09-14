//通用数据操作对象
const  mysql = require('mysql')
//创建数据库连接池
const pool = mysql.createPool(require('../model/dbconfig').config)
//公开的模块方法
function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                console.log('数据库连接失败:'+err.message)
                reject(err)
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        console.log('数据库操作失败:'+err.message)
                        reject(err)
                    }else{
                        console.log('数据库操作成功')
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })

}
module.exports = query;