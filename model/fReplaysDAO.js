//关于评论回复表的相关数据操作
const DAO = require('../model/DAO')

class REP{
    //获取所有评论回复方法  传入评论的id
    getReply(fcId){
        return DAO('select * from fReplays where fcId=?',[fcId]);
    }
    //添加一条回复  外部传参进去
    addReply(reply){
        return DAO('insert into fReplays(fcId,frman,frText) values (?,?,?)',
            [reply.fcId,reply.frman,reply.frText])
    }
    // 删除一条评论回复的方法
    delReply(frId){
    return DAO('delete  from fReplays where frId=?',[frId])
    }
    //那条评论删除了，底下的回复也随之删除掉，这条语句在评论删除中调用
    delComNull(){
        return DAO('delete fReplay from fReplay join forumCom on fReplay.fcId=forumCom.fcId where forumCom.fcId is NULL')
    }

}
module.exports = new REP();