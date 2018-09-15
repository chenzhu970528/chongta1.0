const router = require('koa-router')();
const forumArtDAO= require('../model/forumArtDAO');
const forumComDAO= require('../model/forumComDAO');
const forumLikeDAO= require('../model/forumLikeDAO');
const fReplaysDAO= require('../model/fReplaysDAO');

//adoptions根路由
router.prefix('/forumSee');
//精品推荐
router.get('/essence',async (ctx,next)=>{
    let jsondata = await forumArtDAO.getEssence();
    console.log(jsondata)
});
//宠物日记
router.get('/diary',async (ctx,next)=>{
    let jsondata = await forumArtDAO.getDiary();
    console.log(jsondata)
});
//日常交流
router.get('/gossip',async (ctx,next)=>{
    let jsondata = await forumArtDAO.getGossip();
    console.log(jsondata)
    // await ctx.render('forumArt',{title:'日常交流',data:jsondata})
});
//查看帖子评论内容
router.get('/comment',async (ctx,next)=>{
    let jsondata = await forumComDAO.getComment();
    console.log(jsondata)
});
//查看帖子赞的数量
router.get('/like',async (ctx,next)=>{
    let jsondata = await forumLikeDAO.getLike();
    console.log(jsondata)
});
//查看单个评论的所有回复
router.get('/reply',async (ctx,next)=>{
    let jsondata = await fReplaysDAO.getReply();
    console.log(jsondata)
});

module.exports = router;
