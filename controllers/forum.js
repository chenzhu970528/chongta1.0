const fReplaysDAO = require('../model/fReplaysDAO');
const forumArtDAO = require('../model/forumArtDAO');
const forumComDAO = require('../model/forumComDAO');
const forumLikeDAO = require('../model/forumLikeDAO');
const router = require('koa-router')();
const path = require('path')
const formidable = require("formidable");
module.exports = {
    //添加帖子
    addArt: async (ctx, next) => {
        console.log(ctx.request.body);
        //1.收集数据
        let art = {};
        art.faTitle = ctx.request.body.faTitle;
        art.faText = ctx.request.body.faText;
        art.userId = ctx.request.body.userId;
        art.userName = ctx.request.body.userName;
        art.faType = ctx.request.body.faType;
        try {
            //2.调用用户数据访问对象的添加方法
            let jsondata = await forumArtDAO.addPost(art)
            //3.反馈结果
            ctx.body = {"code": 200, "message": "ok", data: art}
            ctx.render('art1', {data: jsondata})
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
//图片
    addImg: async (ctx, next) => {
        const form = new formidable.IncomingForm()
        form.uploadDir = "../public/uploadfile";
        form.keepExtensions = true;
        let urlImages = []
        return new Promise(function (resolve, reject) {
            form.parse(ctx.req, function (err, fields, files) {
                if (err) reject(err.message)
                console.log('获取数据文件了......')
                // if(err){console.log(err); return;}
                for (name in files) {
                    urlImages.push(path.parse(files[name].path).base)
                }
                console.log(urlImages)
                resolve(urlImages)
            })
        }).then((data) => {
            //按wangeditor格式,输出结果,把上传的文件名返回
            ctx.body = {errno: 0, data: data};
        });
    },

    //添加评论
    addComment: async (ctx, next) => {
        console.log(ctx.request.body);
        //1.收集数据
        let comment = {};
        comment.faId = ctx.request.body.faId;
        comment.faText = ctx.request.body.faText;
        comment.userId = ctx.request.body.userId;
        comment.userName = ctx.request.body.userName;
        try {
            await forumComDAO.addComment(comment);
            ctx.body = {"code": 200, "message": "ok", data: comment}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //添加回复
    addReply: async (ctx, next) => {
        console.log(ctx.request.body)

        //1.收集数据
        let reply = {};
        reply.fcId = ctx.request.body.fcId;
        reply.fcName = ctx.request.body.fcName;
        reply.frman = ctx.request.body.frman;
        reply.frName = ctx.request.body.frName;
        reply.frText = ctx.request.body.frText;
        try {
            await fReplaysDAO.addReply(reply);
            ctx.body = {"code": 200, "message": "ok", data: reply}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //添加点赞行
    addLike: async (ctx, next) => {
        console.log(ctx.request.body)
        //1.收集数据
        let like = {};
        like.faId = ctx.request.body.faId;
        like.userId = ctx.request.body.userId;
        try {
            await forumLikeDAO.addLike(like);
            ctx.body = {"code": 200, "message": "ok", data: like}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //管理员添加推荐
    addEssDiary: async (ctx, next) => {
        //1.收集数据

        let faId = ctx.request.body.faId;
        await forumArtDAO.addEssDiary(faId);
        try {
            ctx.body = {"code": 200, "message": "ok", data: '帖子id:' + faId + '添加推荐成功'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //管理员删除推荐
    delEssDiary: async (ctx, next) => {
        //1.收集数据

        let faId = ctx.request.body.faId;
        await forumArtDAO.delEssDiary(faId);
        try {
            ctx.body = {"code": 200, "message": "ok", data: '帖子id:' + faId + '删除推荐成功'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },

    //删除帖子
    delArt: async (ctx, next) => {
        //1.收集数据
        let faId = ctx.request.body.faId;
        try {
            await forumArtDAO.delArt(faId);
            ctx.body = {"code": 200, "message": "ok", data: '成功删除帖子以及相关评论回复、点赞数量'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //删除评论
    delComment: async (ctx, next) => {
        //1.收集数据
        let fcId = ctx.request.body.fcId;
        try {
            await forumComDAO.delComment(fcId);
            ctx.body = {"code": 200, "message": "ok", data: '成功删除评论以及相关回复'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //删除回复
    delReply: async (ctx, next) => {
        //1.收集数据
        let frId = ctx.request.body.frId;
        try {
            await fReplaysDAO.delReply(frId);
            ctx.body = {"code": 200, "message": "ok", data: '删除回复成功'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //删除点赞
    delOneLike: async (ctx, next) => {
        //1.收集数据
        let like = []
        like.faId = ctx.request.body.faId;
        like.userId = ctx.request.body.userId;
        await forumLikeDAO.delOneLike(like);

        try {
            ctx.body = {"code": 200, "message": "ok", data: '赞删除成功'}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看是否有赞
    selike: async (ctx, next) => {
        //1.收集数据
        let like = []
        like.faId =ctx.request.query.faId
        like.userId = ctx.request.query.userId;
       let data= await forumLikeDAO.slike(like);
        let l =data.length
        try {
            ctx.body = {"code": 200, "message": "ok", data:l}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
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
    getEssence: async (ctx, next) => {
        //1.收集数据
        let data = await forumArtDAO.getEssence();
        try {
            ctx.body = {"code": 200, "message": "ok", data: data};
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看宠物日记
    getDiary: async (ctx, next) => {
        let data = await forumArtDAO.getDiary();
        try {
            ctx.body = {"code": 200, "message": "ok", data: data};
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看交流
    getGossip: async (ctx, next) => {
        let data = await forumArtDAO.getGossip();
        try {
            ctx.body = {"code": 200, "message": "ok", data: data};
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看最新发布
    seeTime: async (ctx, next) => {
        try {
            let data = await forumArtDAO.seeTime();
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看用户日记
    seeDiary: async (ctx, next) => {
        try {
            let data = await forumArtDAO.diary(ctx.request.query.userId);
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
        ;
    },
    //查看用户交流
    seeShare: async (ctx, next) => {
        try {
            let data = await forumArtDAO.share(ctx.request.query.userId);
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看用户点赞
    seeLike: async (ctx, next) => {
        try {
            let data = await forumArtDAO.like(ctx.request.query.userId);
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },


    //查看用户评论回复
    userCom: async (ctx, next) => {
        try {
            let a = []
            let data = await forumComDAO.com(ctx.request.query.userId);
            let data2 = await forumComDAO.comArt(ctx.request.query.userId);
            for (let i = 0; i < data.length; i++) {
                let arr = {}
                for (let j = 0; j < data2.length; j++) {
                    if (data[i].faId === data2[j].faId) {
                        arr.faId = data2[j].faId
                        arr.faTitle = data2[j].faTitle
                        arr.userName = data2[j].userName
                        arr.faText = data[i].faText
                        arr.time = data[i].time
                    }

                }
                a.push(arr)
            }
            let a1 = []
            let data1 = await fReplaysDAO.queryRep(ctx.request.query.userId);
            let data21 = await fReplaysDAO.queryArt(ctx.request.query.userId);
            for (let i = 0; i < data1.length; i++) {
                let arr1 = {}
                for (let j = 0; j < data21.length; j++) {
                    if (data1[i].faId === data21[j].faId) {
                        arr1.faId = data21[j].faId
                        arr1.faTitle = data21[j].faTitle
                        arr1.userName = data21[j].userName
                        arr1.frText = data1[i].frText
                        arr1.time = data1[i].time
                    }

                }
                a1.push(arr1)
            }
            for (let x = 0; x < a1.length; x++) {
                a.push(a1[x])
            }


            ctx.body = {"code": 200, "message": "ok", data: a}
            return a;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //帖子赞排行
    seeLikes: async (ctx, next) => {
        try {
            let data = await forumArtDAO.likeSum();
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //评论总数
    // Sum: async (ctx, next) => {
    //     try {
    //         let faId = ctx.request.query.faId;
    //         let data = await forumArtDAO.comSum(faId);
    //         let data2 = await forumArtDAO.likes(faId);
    //         let arr = [data[0][0], data2[0]]
    //         ctx.body = {"code": 200, "message": "ok", data: arr}
    //         return data;
    //     } catch (err) {
    //         ctx.body = {"code": 500, "message": err.toString(), data: []}
    //     }
    // },
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
    seeAll: async (ctx, next) => {
        //1.收集数据
        let art = {};
        let faId = ctx.query.faId;
        art.art = await forumArtDAO.seeAll(faId);
        art.sum = await forumArtDAO.comSum(faId);//评论数
        let com = await forumComDAO.getComment(faId)
        let replys = [];
        let cc
        let l = []
        let a
        let b
        if (com.length > 0) {
            art.comment = com;
            for (let i = 0; i < com.length; i++) {
                cc = await fReplaysDAO.getReply(com[i].fcId)
                replys.push(cc)

            }
            a = replys[0].length
            for (let i = 0; i < replys.length; i++) {
                if (replys[i].length > 0) {
                    b = replys[i]
                    for (let j = 0; j < b.length; j++) {
                        l.push(b[j])
                    }
                }
            }
        }
        art.reply = l;
        art.like = await forumLikeDAO.getLike(faId);
        try {
            ctx.body = {"code": 200, "message": "ok", data: art}
            return art

        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //关键字查询帖子
    seeQuery: async (ctx, next) => {
        //1.收集数据
        let Keyword = ctx.query.Keyword;
        let data = await forumArtDAO.seeQuery(Keyword)

        try {
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },

};