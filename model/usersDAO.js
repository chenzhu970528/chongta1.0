const DAO = require('../model/DAO')

class USERS{
//添加用户信息，注册
addUsers(user){
    return DAO('insert into user (userName,headPic,signature,userPwd,userEmail,userPhone,sex,wechat,realName,idPic,idNo)values(?,?,?,?,?,?,?,?,?,?,?)',
        [user.userName,user.headPic,user.signature,user.userPwd,user.userEmail,user.userPhone,user.sex,user.wechat,user.realName,user.idPic,user.idNo,])
}
//用户登录
login(user){
    return DAO('select * from user where userPhone=? and userPwd =? ',[user.userPhone,user.userPwd])
}
}
module.exports = new USERS();