//关于论坛文章表的相关数据操作
const DAO = require('../model/DAO')

class ART{
    //获取全部论坛文章表方法
    getforumArt(){
        return DAO('select * from forumArt',[]);
    }

}
module.exports = new ART();