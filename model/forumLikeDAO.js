//关于论坛点赞表的相关数据操作
const DAO = require('../model/DAO')

class LIKE{
    //获取一个文章所有赞方法 传入文章id
    getLike(faId){
        return DAO('select count(1)as like_sum from forumLike where faId=? ',[faId]);
    }
    //点赞加一行,外部传参进去
    addLike(like){
        return DAO('insert into forumLike (faId,userId) values(?,?) ',
            [like.faId,like.userId])
    };
    //删除个人赞
    delOneLike(like){
        return DAO('delete  from forumLike where faId=? and userId=?',[like.faId,like.userId])
    };
    //查看是否有赞
    slike(like){
        return DAO('select * from forumLike where faId=? and userId=?',[like.faId,like.userId])
    };

}
module.exports = new LIKE();