//关于论坛评论表的相关数据操作
const DAO = require('../model/DAO');

class COM{
    //获取一个帖子所有评论方法
    getComment(faId){
        return DAO('select * from forumCom where faId= ?',[faId]);
    }
    //添加一条评论  外部传参进去
    addComment(comment){
        return DAO('insert into forumCom (faId,faText,userId,time) values(?,?,?,?)',
            [comment.faId,comment.faText,comment.userId,comment.time] )
    }

    //删除一条评论
    delComment(fcId){
        return DAO('delete from forumCom where fcId=?',[fcId])
    }
    //论坛文章删除，评论随之删除
    delArtNull(faId){
            // return DAO('delete forumCom from forumCom join forumArt on forumCom.faId=forumArt.faId where forumArt.faId is NULL')
            return DAO('delete  from forumCom  where faId =?',[faId])
        }

}
module.exports = new COM();