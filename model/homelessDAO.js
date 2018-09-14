//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getAdoptions(){
        return DAO('select * from homeless',[]);
    }


}
module.exports = new DB();