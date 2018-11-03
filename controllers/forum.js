const fReplaysDAO = require('../model/fReplaysDAO');
const forumArtDAO = require('../model/forumArtDAO');
const forumComDAO = require('../model/forumComDAO');
const forumLikeDAO = require('../model/forumLikeDAO');
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require('moment')
module.exports = {
    //添加帖子
    addArt: async (ctx, next) => {
        var pics = '';//保存所有图片
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/formUpload'    //设置文件存放路径
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            console.log(files.filename.length)

            if (!files.filename.length) {
                //1.收集数据
                let art = {};
                art.userId = fields.userId;
                art.faText = fields.faText;
                art.faTitle = fields.faTitle;
                art.userName = fields.userName;
                art.faType = fields.faType;
                var filename = files.filename.name;
                var src = path.join(__dirname, files.filename.path)//获取源文件全路径
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics = "/uploadfile/formUpload/" + fileDes + ','
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                console.log(fileDes)
                art.faImg = pics
                try {
                    //2.调用用户数据访问对象的添加方法
                    let jsondata = await forumArtDAO.addPost(art)
                    //3.反馈结果
                    ctx.body = {"code": 200, "message": "ok", data: art}
                    ctx.render('art1', {data: jsondata})
                } catch (err) {
                    ctx.body = {"code": 500, "message": err.toString(), data: []}
                }
                if (err) {
                    ctx.body = '上传失败'
                }
            } else {
                let art = {};
                art.userId = fields.userId;
                art.faText = fields.faText;
                art.faTitle = fields.faTitle;
                art.userName = fields.userName;
                art.faType = fields.faType;
                for (let i = 0; i < files.filename.length; i++) {
                    let filename = files.filename[i].name;
                    let src = path.join(__dirname, files.filename[i].path)//获取源文件全路径
                    // console.log(src)
                    //获取更名后的文件名(不包含路径)
                    let fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                    pics += "/uploadfile/formUpload/" + fileDes + ",";
                    // 更名同步方式
                    fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                }
                art.faImg = pics
                try {
                    //2.调用用户数据访问对象的添加方法
                    let jsondata = await forumArtDAO.addPost(art)
                    //3.反馈结果
                    ctx.body = {"code": 200, "message": "ok", data: art}
                    ctx.render('art1', {data: jsondata})
                } catch (err) {
                    ctx.body = {"code": 500, "message": err.toString(), data: []}
                }
                if (err) {
                    ctx.body = '上传失败'
                }
            }

        })
        ctx.body = '上传成功'
    },

    //添加评论
    addComment: async (ctx, next) => {
            let pics = '';//保存所有图片
            let form = new formidable.IncomingForm();
            form.uploadDir = '../public/uploadfile/formUpload'    //设置文件存放路径
            let now = moment(new Date()).format('YYYYMMDDHHmmss')
            form.multiples = true;  //设置上传多文件
            form.parse(ctx.req, async function (err, fields, files) {
                //1.收集数据
                let comment = {};
                comment.faId = fields.faId;
                comment.faText =fields.faText;
                comment.userId = fields.userId;
                comment.userName= fields.userName;
                console.log('开始咯')
                console.log('00000000000',files.filename)
                if(!files.filename){
                    console.log('没图片啊')
                    comment.comImg = ''
                }
               else{
                    let filename =  files.filename.name;

                    let src = path.join(__dirname, files.filename.path)//获取源文件全路径
                    let fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                    pics = "/uploadfile/formUpload/" + fileDes
                    // 更名同步方式
                    fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                    comment.comImg = pics
                }


                try {
                    //2.调用用户数据访问对象的添加方法
                   await forumComDAO.addComment(comment)
                    //3.反馈结果
                    ctx.body = {"code": 200, "message": "ok", data: comment}

                } catch (err) {
                    ctx.body = {"code": 500, "message": err.toString(), data: []}
                }
                if (err) {
                    ctx.body = '上传失败'
                }
            })
            ctx.body = '上传成功'
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
            return faId
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //管理员删除推荐
    delEssDiary: async (ctx, next) => {
        //1.收集数据

        let faId = ctx.query.faId;
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
        let faId = ctx.request.query.faId;
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
        let fcId = ctx.request.query.fcId;
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
        let frId = ctx.request.query.frId;
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
        like.faId = ctx.request.query.faId
        like.userId = ctx.request.query.userId;
        let data = await forumLikeDAO.slike(like);
        let l = data.length
        try {
            ctx.body = {"code": 200, "message": "ok", data: l}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //查看是否是推荐
    seeEss: async (ctx, next) => {
        //1.收集数据
        let faId = ctx.request.query.faId
        let data = await forumArtDAO.seeEss(faId);
        let l = data.length
        try {
            ctx.body = {"code": 200, "message": "ok", data: l}
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
                        arr.faText1 = data2[j].faText
                        console.log(data2[j].faText)
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
                        arr1.faText1= data21[j].faText
                        console.log(data21[j].faText)
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
            let val = []
            for (let i = 0; i < 10; i++) {
                let aa = await forumArtDAO.seeAll(data[i].faId)
                val.push(aa);
            }
            ctx.body = {"code": 200, "message": "ok", data: val}
            return val;
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
        art.pic = await forumArtDAO.seeArtPic(faId);//发帖人头像

        art.sum = await forumArtDAO.comSum(faId);//评论数
        let com = await forumComDAO.getComment(faId)
        let replys = [];
        let cc
        let l = []
        let a
        let b
        let headpic = []//评论头像
        let head//回复人头像
        if (com.length > 0) {
            art.comment = com;
            for (let i = 0; i < com.length; i++) {
                cc = await fReplaysDAO.getReply(com[i].fcId)
                headpic.push(await forumArtDAO.seeComPic(com[i].userId));//评论人头像
                replys.push(cc)

            }
            art.comhead = headpic

            for (let i = 0; i < replys.length; i++) {
                if (replys.length > 0) {
                    b = replys[i]   //把b接受回复

                    for (let j = 0; j < b.length; j++) {
                        a = b[j].frman
                        head = await forumArtDAO.seeComPic(a);//回复人头像
                        b[j].headPic = head[0].headPic  //头像添加进回复

                        l.push(b[j])  //l存放每个评论
                    }
                }
            }
            art.reply = l
        }
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

    //查看用户头像
    seePic: async (ctx, next) => {
        //1.收集数据
        let userId = ctx.query.userId;
        let data = await forumArtDAO.seeComPic(userId)

        try {
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },

    //查看发帖人头像
    seeArtPic: async (ctx, next) => {
        //1.收集数据
        let faId = ctx.query.faId;
        let data = await forumArtDAO.seeArtPic(faId)

        try {
            ctx.body = {"code": 200, "message": "ok", data: data}
            return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },

    //查看回复最多的
    seeCom: async (ctx, next) => {
        //1.收集数据
        let art = []
        let art1 = []
        let id
        let art2 = []
        let faId = await forumArtDAO.seeTime()
        for (let i = 0; i < faId.length; i++) {
            art.push(await forumArtDAO.comSum(faId[i].faId))
            art1.push(art[i][0])
            art1[i].push(faId[i].faId)
        }
        var t;
        for (var i = 0; i < art1.length; i++) {
            for (j = i + 1; j < art1.length; j++) {
                if (art1[i][0].sum_count < art1[j][0].sum_count) {
                    t = art1[i];
                    art1[i] = art1[j];
                    art1[j] = t;
                }
            }
        }
        for (let i = 0; i < 9; i++) {
            id = art1[i][1]
            art2.push(await forumArtDAO.seeAll(id))
        }
        try {
            ctx.body = {"code": 200, "message": "ok", data: art2}
            // return data;
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },

};