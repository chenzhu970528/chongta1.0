//关于用户详细信息的相关数据操作
const DAO = require('../model/DAO')

class DB {
    //获取用户详细信息方法
    detailIf(userId) {
        return DAO('select user.userName,headPic,wechat,userEmail,userPhone,sex,lpPic,lpTime,address from user,lostPets where lostPets.userId=user.userId and user.userId=?', [userId]);
    }
}
module.exports = new DB();