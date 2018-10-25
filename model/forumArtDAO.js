//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //关键字查找帖子
    seeQuery(Keyword){
        return DAO('call seequery(?);',[Keyword]);
    }
    //查看单个帖子评论回复总人数
    comSum(faId){
        return DAO('call newsum(?);',[faId])
    };

    //查看单个帖子联合使用
    seeAll(faId){
       return DAO('select * from forumArt where faId=?',[faId])
    };
    //按点赞排行显示文章名字，还有id
    likeSum(){
        return DAO('call likes()',[])
    };

    //按时间排序，最新发布
    seeTime(){
       return DAO('select * from forumArt order by time desc',[])
    }
    //获取精品推荐方法
    getEssence(){
        return DAO('select * from forumArt where faId in(select faId from forumLike  GROUP BY faId having count(*)>100) or faType like "%l" order by time desc',[]);
    }
    //获取宠物日记方法
    getDiary(){
        return DAO('select * from forumArt where faType like "a%" order by time desc',[]);
    }
    //获取日常交流的方法
    getGossip(){
        return DAO('select * from forumArt where faType like "b%" order by time desc',[]);
    };
    //获取用户领养日记的方法
    diary(userId){
        return DAO("select * from forumArt WHERE userId=? and faType like '%a%'",[userId]);
    };

    //获取用户日常交流的方法
    share(userId){
        return DAO("select * from forumArt WHERE userId=? and faType like '%b%'",[userId]);
    }

  //获取用户点赞文章
    like(userId){
        return DAO("select * from forumArt where faId in (select faId from forumLike where userId=?)",[userId]);
    }


    //添加宠物日记，日常交流的方法
    addPost(art){
        return DAO('insert into forumArt (faTitle,faText,userId,userName,faType)values(?,?,?,?,?)',
            [art.faTitle,art.faText,art.userId,art.userName,art.faType])
    }

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
        return DAO('call del (?)',[faId])
    }


}
module.exports = new ART();