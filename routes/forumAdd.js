const router = require('koa-router')();

const forum=require('../controllers/forum')
//添加~
router.prefix('/forumAdd');
//添加帖子
router.post('/art',async (ctx,next)=>{
    let jsondata = await forum.addArt(ctx,next);
    console.log(jsondata)
})
//添加评论
router.post('/comment',async (ctx,next)=>{
    let jsondata = await forum.addComment(ctx,next);
    console.log(jsondata)
})
//添加回复
router.post('/reply',async (ctx,next)=>{
    let jsondata = await forum.addReply(ctx,next);
    console.log(jsondata)
})
//管理员添加推荐
router.post('/diary',async (ctx,next)=>{
    let jsondata = await forum.addEssDiary(ctx,next);
    console.log(jsondata)
});
//添加点赞
router.post('/like',async (ctx,next)=>{
    let jsondata = await forum.addLike(ctx,next);
    console.log(jsondata)
});

module.exports = router;