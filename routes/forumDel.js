const router = require('koa-router')();
const forum=require('../controllers/forum')
//删除~
router.prefix('/forumDel');
//删除帖子
router.get('/comment',async (ctx,next)=>{
    let jsondata = await forum.delComment(ctx,next);
    console.log(jsondata)
});
//删除评论
router.get('/post',async (ctx,next)=>{
    let jsondata = await forum.delPost(ctx,next);
    console.log(jsondata)
});
//删除回复
router.get('/reply',async (ctx,next)=>{
    let jsondata = await forum.delReply(ctx,next);
    console.log(jsondata)
})
//删除点赞
router.get('/like',async (ctx,next)=>{
    let jsondata = await forum.delOneLike(ctx,next);
    console.log(jsondata)
})

module.exports = router;