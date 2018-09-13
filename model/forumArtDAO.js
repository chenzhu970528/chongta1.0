//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //获取精华帖子方法
    //select * from forumArt where faId = (select faId from forumLike where count(1)>100)
    getEssence(){
        return DAO('select * from forumArt where name like "%l"',[]);
    }
    //获取宠物日记方法
    getDiary(){
        return DAO('select * from forumArt where ',[]);
    }
    //获取日常交流的方法
    getGossip(){
        return DAO('select * from forumArt where ',[]);
    }

}
module.exports = new ART();