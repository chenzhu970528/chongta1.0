//关于用户详细信息的相关数据操作
const DAO = require('../model/DAO')

class DB {
    //获取用户详细信息方法
    detailIf(userId) {
        return DAO("select user.userName,headPic,wechat,userEmail,userPhone,sex,lpPic,lpTime,address,\n" +
            "case\n" +
            "\twhen user.sex=0 then '女' \n" +
            "\telse '男'\n" +
            "\t\n" +
            "end as sex\n" +
            "from lostpets,user where user.userId=lostpets.userId and user.userId=1", [userId]);
    }

}
module.exports = new DB();