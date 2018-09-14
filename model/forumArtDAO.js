//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //获取精品推荐方法
    getEssence(){
        return DAO('select * from forumArt where faType like "%l"',[]);
    }
    //获取宠物日记方法
    getDiary(){
        return DAO('select * from forumArt where faType like "a%',[]);
    }
    //获取日常交流的方法
    getGossip(){
        return DAO('select * from forumArt where faType like "b%',[]);
    }
    //添加宠物日记，日常交流的方法  外部传参进去！！！
    addPost(faTitle,faText,userId,time,faType){
        return DAO('insert into forumArt (faTitle,faText,userId,time,faType)values(?,?,?,?,?)',
            [faTitle,faText,userId,time,faType])
    }

    //添加精品推荐的方法
    addEssence(){
        //赞的数量大于100
        return DAO('select * from forumArt where faId in (select faId from forumLike where count(1)>100)')
    }

    //管理员添加精品推荐
    addEssDiary(){
        return DAO('update forumArt set faType = ' +
            'case when faType="a" then "al"' +
            'case when  faType="b" then "bl"'+
            'else faType'+
            'end')
    }
    //删除
    delPost(){
        return DAO('delete from forumArt where faId=?',[])
    }



}
module.exports = new ART();