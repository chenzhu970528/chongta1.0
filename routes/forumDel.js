const router = require('koa-router')();
const forum=require('../controllers/forum')
//删除~
router.prefix('/forumDel');
//删除帖子
router.get('/art',async (ctx,next)=>{
    let jsondata = await forum.delArt(ctx,next);
    console.log(jsondata)
});
//删除评论
router.get('/comment',async (ctx,next)=>{
    let jsondata = await forum.delComment(ctx,next);
    console.log(jsondata)
});
//删除回复
router.get('/reply',async (ctx,next)=>{
    let jsondata = await forum.delReply(ctx,next);
    console.log(jsondata)
})
//删除点赞
router.post('/like',async (ctx,next)=>{
    let jsondata = await forum.delOneLike(ctx,next);
    console.log(jsondata)
});
//管理员删除推荐
router.post('/diary',async (ctx,next)=>{
    let jsondata = await forum.delEssDiary(ctx,next);
    console.log(jsondata)
});

module.exports = router;