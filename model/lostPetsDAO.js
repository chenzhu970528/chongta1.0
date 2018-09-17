//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getlostPets(){
        return DAO('select * from lostpets,user where user.userId=lostpets.userId',[]);
    }

}
module.exports = new DB();