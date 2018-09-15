//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //查看单个帖子
    seeAll(faId){
       return DAO('select * from forumArt where faId=?',[faId])
    }
    //获取精品推荐方法
    getEssence(){
        return DAO('select * from forumArt where (faType like "%l" or select faId from forumLike  GROUP BY faId having count(*)>100)',[]);
    }
    //获取宠物日记方法
    getDiary(){
        return DAO('select * from forumArt where faType like "a%"',[]);
    }
    //获取日常交流的方法
    getGossip(){
        return DAO('select * from forumArt where faType like "b%"',[]);
    }
    //添加宠物日记，日常交流的方法  外部传参进去！！！
    addPost(post){
        return DAO('insert into forumArt (faTitle,faText,userId,time,faType)values(?,?,?,?,?)',
            [post.faTitle,post.faText,post.userId,post.time,post.faType])
    }

    //添加精品推荐的方法
    addEssence(){
        //赞的数量大于100的文章id
        return DAO('select * from forumLike GROUP BY faId having count(*)>100')
    }

    //管理员添加精品推荐
    addEssDiary(){
        return DAO('update forumArt set faType =case when faType="a" then "al" when faType="b" then "bl"else faType end')
    }
    //删除
    delPost(faId){
        return DAO('delete from forumArt where faId=?',[faId])
    }



}
module.exports = new ART();