var forumArtDAO = require('../model/forumArtDAO');
var forumComDAO = require('../model/forumComDAO');
var fReplaysDAO = require('../model/fReplaysDAO');
var forumLikeDAO = require('../model/forumLikeDAO');
module.exports = {
       //添加帖子
    addPost:async (ctx,next) => {
        //1.收集数据
        let post = {};
        post.faTitle = '宠物不长毛';
        post.faText = '宠物没有毛';
        post.userId = '7';
        post.time = '2018-09-15 11:07:35';
        post.faType = 'bl';
        try{
            //2.调用用户数据访问对象的添加方法
            await forumArtDAO.addPost(post)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加评论
    addComment:async (ctx,next) => {
        //1.收集数据
        let comment = {};
        comment.faId = 4;
        comment.faText = '我的宠物也不长毛';
        comment.userId = 9;
        comment.time = '2018-09-15 11:37:35';
        try{
            await forumComDAO.addComment(comment);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加回复
    addReply:async (ctx,next) => {
        //1.收集数据
        let reply = {};
        reply.fcId = 1;
        reply.frman =5;
        reply.frText = '啊哈';
        reply.time = '2018-09-15 16:37:35';
        try{
            await fReplaysDAO.addReply(reply);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加点赞行
    addLike:async (ctx,next) => {
        //1.收集数据
        let like = {};
        like.faId = 1;
        like.userId =7;
        like.time = '2018-09-15 16:37:35';
        try{
            await forumLikeDAO.addLike(like);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    //删除帖子
    delPost:async (ctx,next) => {
        //1.收集数据
        let faId =1;
        try{
            await forumComDAO.delArtNull(faId);
            await forumLikeDAO.delLike(faId);
            await fReplaysDAO.delComNull(faId);
            await forumArtDAO.delPost(faId);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除评论
    delComment:async (ctx,next) => {
        //1.收集数据
        let fcId =1;
        try{
            await forumComDAO.delComment(fcId);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除回复
    delReply:async (ctx,next) => {
        //1.收集数据
        let frId =8;
        try{
            await fReplaysDAO.delReply(frId);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除点赞
    delOneLike:async (ctx,next) => {
        //1.收集数据
        let flileId =4;
        try{
            await forumLikeDAO.delOneLike(flileId);
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看单个帖子评论
    getComment:async (ctx,next) => {
        //1.收集数据
        let faId =4;
        try{
            let data = await forumComDAO.getComment(faId);
            ctx.body = {"code":200,"message":"ok",data:[]};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看评论所有回复
    getReply:async (ctx,next) => {
        //1.收集数据
        let fcId =1;
        try{
            let data=await fReplaysDAO.getReply(fcId);
            ctx.body = {"code":200,"message":"ok",data:[]}
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看帖子所有的赞
    getLike:async (ctx,next) => {
        //1.收集数据
        let faId =1;
        try{
            let data=await forumLikeDAO.getLike(faId);
            ctx.body = {"code":200,"message":"ok",data:[]}
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    //查看帖子所有信息
    seeAll:async (ctx,next) => {
        //1.收集数据
        let post = {};
        let faId=1;

        post.post=await forumArtDAO.seeAll(faId);
       post.comment= await forumComDAO.getComment(faId);

        post.reply=await fReplaysDAO.getReply(post.comment[0].fcId);
        post.like=await forumLikeDAO.getLike(faId);

        try{
            ctx.body = {"code":200,"message":"ok",data:[]}
            return post

        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }

};