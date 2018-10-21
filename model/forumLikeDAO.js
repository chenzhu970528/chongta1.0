//关于论坛点赞表的相关数据操作
const DAO = require('../model/DAO')

class LIKE{
    //获取论坛所有赞方法 传入文章id
    getLike(faId){
        return DAO('select count(1)as like_sum from forumLike where faId=?',[faId]);
    }
    //点赞加一行,外部传参进去
    addLike(like){
        return DAO('insert into forumLike (faId,userId) values(?,?) ',
            [like.faId,like.userId])
    };
    delOneLike(flileId){
        return DAO('delete  from forumLike where flileId=?',[flileId])
    };
//论坛文章删除，与之对应的点赞表也删除
    delLike(){
        return DAO('delete forumLike from forumLike join forumArt on forumLike.faId=forumArt.faId where forumArt.faId is NULL',[])
    }
}
module.exports = new LIKE();