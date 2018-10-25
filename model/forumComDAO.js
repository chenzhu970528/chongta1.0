//关于论坛评论表的相关数据操作
const DAO = require('../model/DAO');

class COM{
    //获取一个帖子所有评论方法
    getComment(faId){
        return DAO('select * from forumCom where faId= ? order by time desc',[faId]);
    }
     //用户的评论和回复文章标题
    com(userId){
        return DAO('select faId,time,faText from forumCom where userId=?',[userId]);
    }
    //
    comArt(userId){
        return DAO('select faId,faTitle,userName from forumArt where faId in (select faId from forumCom where userId=?)',[userId]);
    }

    //添加一条评论  外部传参进去
    addComment(comment){
        return DAO('insert into forumCom (faId,faText,userId,userName) values(?,?,?,?)',
            [comment.faId,comment.faText,comment.userId,comment.userName])
    }

    //删除一条评论
    delComment(fcId){
        return DAO('call delcom1(?)',[fcId])
    }


}
module.exports = new COM();