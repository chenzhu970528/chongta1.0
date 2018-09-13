//关于论坛评论表的相关数据操作
const DAO = require('../model/DAO');

class COM{
    //获取论坛所有评论方法
    getComment(){
        return DAO('select * from forumCom,forumArt where forumCom.faId=forumArt.faId',[]);
    }

}
module.exports = new COM();