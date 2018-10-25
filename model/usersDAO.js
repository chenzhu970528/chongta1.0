const DAO = require('../model/DAO')

class USERS{
    // 显示用户信息
    showUser(userId){
        return DAO('select userId,userName,headPic,userEmail,userPhone,sex,wechat,address from user where userId=?',[userId])
    }
//添加用户信息，注册
addUsers(user){
    return DAO('insert into user (userName,headPic,userPwd,userEmail,userPhone,sex,address)values(?,?,?,?,?,?,?)',
        [user.userName,user.headPic,user.userPwd,user.userEmail,user.userPhone,user.sex,user.address,])
}
//修改用户信息，
modUsers(user){
    console.log(user.userName,user.headPic,user.signature,user.userPwd,user.userEmail,user.userPhone,user.sex,user.wechat,user.realName,user.userId)
    return DAO('update user set userName=?,headPic=?,signature=?,userPwd=?,userEmail=?,userPhone=?,sex=?,wechat=?,realName=? where userId=?',
        [user.userName,user.headPic,user.signature,user.userPwd,user.userEmail,user.userPhone,user.sex,user.wechat,user.realName,user.userId])
}
//用户登录
// loginPhone(userPhone){
//     return DAO('select userPwd from user where userPhone=?',[userPhone])
// }
// loginPwd(userPwd){
//     return DAO('select * from user where userPwd=?',[userPwd]);
// }
login(user1){
    return DAO('select * from user where userPhone=? and userPwd=?',[user1.userPhone,user1.userPwd]);
}
// 显示用户量
showNum(){return DAO('select count(*) num from user')}
}
module.exports = new USERS();