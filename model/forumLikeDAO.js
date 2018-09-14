//关于论坛点赞表的相关数据操作
const DAO = require('../model/DAO')

class LIKE{
    //获取论坛所有赞方法
    getLike(){
        return DAO('select count(1) from forumLike group by faId',[]);
    }
//论坛文章删除，与之对应的点赞表也删除
    delLike(){
        return DAO('delete forumLike from forumLike join forumArt on forumLike.faId=forumArt.faId where forumArt.faId is NULL',[])
    }
}
module.exports = new LIKE();