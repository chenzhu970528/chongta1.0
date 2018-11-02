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
        return DAO('select lostpets.*,user.userId,user.userName,user.userPhone,user.sex from lostpets,user where state!=1 and lostPets.userId=user.userId order by lpId desc',[]);
    }

    // //根据个人Id查看发布的丢失信息
    getlostdetail(userId){
        return DAO('select * from lostpets where userId=? order by lpTime desc',[userId]);
    }
    //根据个人Id查看发布的流浪信息Id
    getidlostPets(userId){
        return DAO('select * from homeless where userId=? order by pTime desc',[userId]);
    }
    //把lostpets表里state变为1
    loststate(lpId){
        return DAO('update lostpets set state=1 where lostpets.lpId=?',[lpId])
    }
    //获取状态为已找到的丢失信息
    founded(state){
        return DAO('SELECT * FROM lostpets,user where state=1 and lostpets.userId=user.userId',[state])
    }
    getlostpetsdetails(lpId){
        return DAO('select lostpets.*,user.userId,user.userName,user.userPhone from lostpets,user where lpId=? and lostpets.userId=user.\n' +
            'userId',[lpId])
    }
    // 查找最新丢失
    getLatest(){return DAO('select * from lostpets ORDER BY lpTime desc LIMIT 0,10',[])}
}
module.exports = new DB();