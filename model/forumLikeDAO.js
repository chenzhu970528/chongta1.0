//关于论坛点赞表的相关数据操作
const DAO = require('../model/DAO')

class LIKE{
    //获取论坛所有赞评论方法
    getLike(){
        return DAO('select count(1) from forumLike',[]);
    }

}
module.exports = new LIKE();