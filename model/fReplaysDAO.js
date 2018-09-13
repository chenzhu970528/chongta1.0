//关于评论回复表的相关数据操作
const DAO = require('../model/DAO')

class COM{
    //获取所有评论回复方法
    getReply(){
        return DAO('select * from fReplays,forumCom where fReplays.userId=forumCom.userId',[]);
    }

}
module.exports = new COM();