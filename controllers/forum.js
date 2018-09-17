
const fReplaysDAO = require('../model/fReplaysDAO');
const forumArtDAO= require('../model/forumArtDAO');
const forumComDAO= require('../model/forumComDAO');
const forumLikeDAO= require('../model/forumLikeDAO');
module.exports = {
       //添加帖子
    addArt:async (ctx,next) => {
        console.log(ctx.request.body);
        //1.收集数据
        let art = {};
        art.faTitle = ctx.request.body.faTitle;
        art.faText = ctx.request.body.faText;
        art.userId = ctx.request.body.userId;
        art.faType = ctx.request.body.faType;
        try{
            //2.调用用户数据访问对象的添加方法
            await forumArtDAO.addPost(art)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:art}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加评论
    addComment:async (ctx,next) => {
        console.log(ctx.request.body)
        //1.收集数据
        let comment = {};
        comment.faId = ctx.request.body.faId;
        comment.faText = ctx.request.body.faText;
        comment.userId = ctx.request.body.userId;
        try{
            await forumComDAO.addComment(comment);
            ctx.body = {"code":200,"message":"ok",data:comment}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加回复
    addReply:async (ctx,next) => {
        console.log(ctx.request.body)

        //1.收集数据
        let reply = {};
        reply.fcId = ctx.request.body.fcId;
        reply.frman =ctx.request.body.frman;
        reply.frText = ctx.request.body.frText;
        try{
            await fReplaysDAO.addReply(reply);
            ctx.body = {"code":200,"message":"ok",data:reply}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加点赞行
    addLike:async (ctx,next) => {
        console.log(ctx.request.body)
        //1.收集数据
        let like = {};
        like.faId = ctx.request.body.faId;
        like.userId =ctx.request.body.userId;
        try{
            await forumLikeDAO.addLike(like);
            ctx.body = {"code":200,"message":"ok",data:like}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //管理员添加推荐
    addEssDiary:async (ctx,next) => {
        //1.收集数据

        let faId = ctx.request.body.faId;
        await forumArtDAO.addEssDiary(faId);
        try{
            ctx.body = {"code":200,"message":"ok",data:'帖子id:'+faId+'添加推荐成功'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
 //管理员删除推荐
    delEssDiary:async (ctx,next) => {
        //1.收集数据

        let faId = ctx.request.body.faId;
        await forumArtDAO.delEssDiary(faId);
        try{
            ctx.body = {"code":200,"message":"ok",data:'帖子id:'+faId+'删除推荐成功'}
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
    // //查看单个帖子评论
    // getComment:async (ctx,next) => {
    //     console.log(ctx.request.body)
    //
    //     //1.收集数据
    //     let faId =ctx.request.body.faId;
    //     try{
    //         let data = await forumComDAO.getComment(faId);
    //         ctx.body = {"code":200,"message":"ok",data:[]};
    //         return data;
    //     }catch(err){
    //         ctx.body = {"code":500,"message":err.toString(),data:[]}
    //     }
    // },

    //查看所有推荐
    getEssence:async (ctx,next) =>{
        //1.收集数据
        let data =await forumArtDAO.getEssence();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看宠物日记
    getDiary:async (ctx,next) => {
        let data =await forumArtDAO.getDiary();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看交流
    getGossip:async (ctx,next) => {
        let data =await forumArtDAO.getGossip();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //查看最新发布
    seeTime:async (ctx,next) => {
        try{
            let data=await forumArtDAO.seeTime();
            ctx.body = {"code":200,"message":"ok",data:data}
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // //查看评论所有回复
    // getReply:async (ctx,next) => {
    //     console.log(ctx.request.body)
    //
    //     //1.收集数据
    //     let fcId =ctx.request.body.fcId
    //     try{
    //         let data=await fReplaysDAO.getReply(fcId);
    //         ctx.body = {"code":200,"message":"ok",data:[]}
    //         return data;
    //     }catch(err){
    //         ctx.body = {"code":500,"message":err.toString(),data:[]}
    //     }
    // },

      //查看帖子所有信息
    seeAll:async (ctx,next) => {
        //1.收集数据
        let art = {};
        let faId=ctx.query.faId;
        art.art=await forumArtDAO.seeAll(faId);
        art.comment= await forumComDAO.getComment(faId);
        art.reply=await fReplaysDAO.getReply(art.comment[0].fcId);
        art.like=await forumLikeDAO.getLike(faId);

        try{
            ctx.body = {"code":200,"message":"ok",data:art}
            return art

        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //关键字查询帖子
    seeQuery:async (ctx,next) => {
        //1.收集数据
        let Keyword =ctx.query.Keyword;
        console.log(Keyword)
        let data=await forumArtDAO.seeQuery(Keyword)
        try{
            ctx.body = {"code":200,"message":"ok",data:data}
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

};