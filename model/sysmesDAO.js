//系统消息
const DAO = require('../model/DAO')

class DB{
    //获取系统消息
    getsysmes(){
        return DAO('select * from sysmes order by time desc',[]);
    }
}
module.exports = new DB();