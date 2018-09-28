//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getlostPets(userId){
        return DAO('select * from lostPets where userId=?',[userId]);
    }
    dellostPets(lpId){
        return DAO('DELETE FROM lostPets WHERE lostPets.lpId = ?',[lpId])
    }
}
module.exports = new DB();