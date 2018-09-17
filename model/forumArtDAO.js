//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //关键字查找帖子
    seeQuery(Keyword){
        console.log(Keyword)
        return DAO('select * from forumArt where faTitle like "%?%" or faText like "%?%" ',
            [Keyword,Keyword])
    }
    //查看单个帖子
    seeAll(faId){
       return DAO('select * from forumArt where faId=?',[faId])

    };
    //按时间排序
    seeTime(){
       return DAO('select * from forumArt order by time desc',[])
    }
    //获取精品推荐方法
    getEssence(){
        return DAO('select * from forumArt where faId in(select faId from forumLike  GROUP BY faId having count(*)>100) or faType like "%l" ',[]);
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
    addPost(art){
        return DAO('insert into forumArt (faTitle,faText,userId,faType)values(?,?,?,?)',
            [art.faTitle,art.faText,art.userId,art.faType])
    }

    // //添加精品推荐的方法
    // addEssence(){
    //     //赞的数量大于100的文章id
    //     return DAO('select * from forumLike GROUP BY faId having count(*)>100')
    // }

    //管理员添加精品推荐
    addEssDiary(faId){
        return DAO('update forumArt set faType = case when faType="a" and faId=? then "al" when faType="b" and faId=? then "bl" else faType end',
            [faId,faId])
    }
    //管理员删除精品推荐
    delEssDiary(faId){
        return DAO('update forumArt set faType = case when faType="al" and faId=? then "a" when faType="bl" and faId=? then "b" else faType end',
            [faId,faId])
    }
    //删除帖子
    delArt(faId){
        return DAO('delete from forumArt where faId=?',[faId])
    }



}
module.exports = new ART();