//关于评论回复表的相关数据操作
const DAO = require('../model/DAO')

class REP{
    //获取所有评论回复方法
    getReply(){
        return DAO('select * from fReplays,forumCom where fReplays.fcId=forumCom.fcId',[]);
    }
    //添加一条回复  外部传参进去
    addReply(fcId,frman,frText,time){
        return DAO('insert into fReplays(fcId,frman,frText,time) values (?,?,?,?)',
            [fcId,frman,frText,time])
    }
    // 删除一条评论回复的方法
    delReply(frId){
    //把一条评论里所有回复删除的方法 = = 没啥用
    //return DAO('delete fReplay from fReplay,forumCom where fReplay.fcId=forumCom.fcId',[])

    return DAO('delete  from fReplay where frId=?',[frId])
    }
    //那条评论删除了，底下的回复也随之删除掉，这条语句在评论删除中调用
    delComNull(){
        return DAO('delete fReplay from fReplay join forumCom on fReplay.fcId=forumCom.fcId where forumCom.fcId is NULL')
    }

}
module.exports = new REP();