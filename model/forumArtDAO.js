//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //获取精华论坛表方法
    getforumArt(){
        return DAO('select * from forumArt',[]);
    }
    //获取宠物日记论坛表方法
    getforumArt(){
        return DAO('select * from forumArt',[]);
    }
    getforumArt(){
        return DAO('select * from forumArt',[]);
    }

}
module.exports = new ART();