//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getlostPets(userId){
        return DAO('select * from homeless where userId=?',[userId]);
    }
    dellostPets(lpId){
        return DAO('DELETE FROM lostPets WHERE lostPets.lpId = ?',[lpId])
    }
    getlost(){
        return DAO('select * from lostPets',[]);
    }
    //

}
module.exports = new DB();