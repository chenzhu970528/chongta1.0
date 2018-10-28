//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getlostPets(homeId){
        return DAO('select * from homeless where homeId=? order by pTime desc',[homeId]);
    }
    dellostPets(lpId){
        return DAO('DELETE FROM lostPets WHERE lostPets.lpId = ?',[lpId])
    }
    getlost(){
        return DAO('select * from lostpets order by lpId desc',[]);
    }
    // //根据个人Id查看发布的丢失信息
    getlostdetail(userId){
        return DAO('select * from lostpets where userId=? order by lpTime desc',[userId]);
    }

}
module.exports = new DB();