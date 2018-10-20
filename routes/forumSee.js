const router = require('koa-router')();

const forum=require('../controllers/forum')
//查看~
//adoptions根路由
router.prefix('/forumSee');
//精品推荐
router.get('/essence',async (ctx,next)=>{
    let jsondata = await forum.getEssence(ctx,next);
    console.log(jsondata)
});
//宠物日记
router.get('/diary',async (ctx,next)=>{
    let jsondata = await forum.getDiary(ctx,next);
    console.log(jsondata)
});
//日常交流
router.get('/gossip',async (ctx,next)=>{
    let jsondata = await forum.getGossip(ctx,next);
    console.log(jsondata)
});
// //查看帖子评论内容
// router.get('/comment',async (ctx,next)=>{
//     let jsondata = await forum.getComment(ctx,next);
//     console.log(jsondata)
// });

//查看单个帖子赞的数量，和评论数量
router.get('/sum',async (ctx,next)=>{
    let jsondata = await forum.Sum(ctx,next);
    console.log(jsondata)
});

//查看帖子赞的数量排行
router.get('/likes',async (ctx,next)=>{
    let jsondata = await forum.seeLikes(ctx,next);
    console.log(jsondata)
});
//查看单个评论的所有回复
// router.get('/reply',async (ctx,next)=>{
//     let jsondata = await forum.getReply(ctx,next);
//     console.log(jsondata)
// });

//查看一个帖子，所有的评论以及评论回复还有赞
router.get('/all',async (ctx,next)=>{
    let jsondata = await forum.seeAll(ctx,next);
    console.log(jsondata)
});
//关键字查找帖子
router.get('/query',async (ctx,next)=>{
    let jsondata = await forum.seeQuery(ctx,next);
    console.log(jsondata)
});
//最新发布
router.get('/time',async (ctx,next)=>{
    let jsondata = await forum.seeTime(ctx,next);
    console.log(jsondata)
});


module.exports = router;
