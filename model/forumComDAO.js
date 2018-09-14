//关于论坛评论表的相关数据操作
const DAO = require('../model/DAO');

class COM{
    //获取论坛所有评论方法
    getComment(){
        return DAO('select * from forumCom,forumArt where forumCom.faId=forumArt.faId',[]);
    }
    //添加一条评论  没写完
    addComment(){
        return DAO('insert into forumCom (faText,faId,userId,time) ')
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