//关于论坛评论表的相关数据操作
const DAO = require('../model/DAO');

class COM{
    //获取帖子所有评论方法
    getComment(faId){
        return DAO('select * from forumCom where faId= ?',[faId]);
    }
    //添加一条评论  外部传参进去
    addComment(faText,faId,userId,time){
        return DAO('insert into forumCom (faText,faId,userId,time) values(?,?,?,?)',
            [faText,faId,userId,time] )
    }

    //删除一条评论
    delComment(){
        return DAO('delete from forumCom where fcId=?',[])
    }
    //论坛文章删除，评论随之删除
    delArtNull(){
            return DAO('delete forumCom from forumCom join forumArt on forumCom.faId=forumArt.faId where forumArt.faId is NULL')
        }

}
module.exports = new COM();