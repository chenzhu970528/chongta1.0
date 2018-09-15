const router = require('koa-router')();
const forumArtDAO= require('../model/forumArtDAO');
const forumComDAO= require('../model/forumComDAO');
const forumLikeDAO= require('../model/forumLikeDAO');
const fReplaysDAO= require('../model/fReplaysDAO');
const forum=require('../controllers/forum')
//添加~
router.prefix('/forumAdd');
//添加帖子
router.get('/post',async (ctx,next)=>{
    let jsondata = await forum.addPost(ctx,next);
    console.log(jsondata)
})
//添加评论
router.get('/comment',async (ctx,next)=>{
    let jsondata = await forum.addComment(ctx,next);
    console.log(jsondata)
})
//添加回复
router.get('/reply',async (ctx,next)=>{
    let jsondata = await forum.addReply(ctx,next);
    console.log(jsondata)
})
//添加点赞
router.get('/like',async (ctx,next)=>{
    let jsondata = await forum.addLike(ctx,next);
    console.log(jsondata)
})
module.exports = router;