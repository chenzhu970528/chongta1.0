var homelessDAO = require('../model/homelessDAO')
var DetailDAO=require('../model/DetailDAO')
var lostMessDAO=require('../model/lostMessDAO')
var lostPetsDAO=require('../model/lostPetsDAO')
var sysmesDAO=require('../model/sysmesDAO')
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require('moment')
module.exports = {
    //获取流浪信息
    getHomeless:async (ctx,next) => {
        let data=await  homelessDAO.getHomeless();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

    // 发布领养信息,找主人
    addhomeless:async (ctx,next) => {
        var pics = '';//保存所有图片
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/homelessUpload'    //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            //1.收集数据
            let art = {};
            art.getmes = fields.getmes;
            art.userId = fields.userId;
            art.detail = fields.detail;
            art.address = fields.address;
            art.type = fields.type;
            art.people = fields.people;
            art.phone = fields.phone;
            art.homeTime = fields.homeTime;
            art.sex = fields.sex;
            //1.收集数据
            // console.log(files)
            for (var i = 0; i < files.filename.length; i++) {
                var filename = files.filename[i].name;
                var src = path.join(__dirname, files.filename[i].path)//获取源文件全路径
                // console.log(src)
                //获取更名后的文件名(不包含路径)
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics += "/uploadfile/homelessUpload/" + fileDes + ",";
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                // console.log(fileDes)
            }
            art.homePic=pics
            // console.log(art)

            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作

            //根据fields.mydata获取上传表单元素的数据，执行写入数据库的操作
            try{
                //2.调用用户数据访问对象的添加方法
                await homelessDAO.addhomeless(art)
                //3.反馈结果
                ctx.body = {"code":200,"message":"ok",data:art}
            }catch(err){
                ctx.body = {"code":500,"message":err.toString(),data:[]}
            }
            if(err){
                ctx.body='上传失败'
            }
        })
        ctx.body='上传成功'

    },
    // 发布丢失信息，找宠物
    addlostPets:async (ctx,next) => {
        var pics = '';//保存所有图片
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/lostUpload'    //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            //1.收集数据
            let art = {};
            art.lpmes = fields.lpmes;
            art.lpTime = fields.lpTime;
            art.lostpeople = fields.lostpeople;
            art.address = fields.address;
            art.lostphone = fields.lostphone;
            art.detail = fields.detail;
            art.reward = fields.reward;
            art.type = fields.type;
            art.sex = fields.sex;
            art.userId = fields.userId;
            // console.log(files)
            for (var i = 0; i < files.filename.length; i++) {
                var filename = files.filename[i].name;
                var src = path.join(__dirname, files.filename[i].path)//获取源文件全路径
                // console.log(src)
                //获取更名后的文件名(不包含路径)
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics += "/uploadfile/lostUpload/" + fileDes + ",";
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                // console.log(fileDes)
            }
            art.lppic=pics
            // console.log(art)

            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作

            //根据fields.mydata获取上传表单元素的数据，执行写入数据库的操作
            try{
                //2.调用用户数据访问对象的添加方法
                await homelessDAO.addlostPets(art)
                //3.反馈结果
                ctx.body = {"code":200,"message":"ok",data:art}
            }catch(err){
                ctx.body = {"code":500,"message":err.toString(),data:[]}
            }
            if(err){
                ctx.body='上传失败'
            }
        })
        ctx.body='上传成功'

    },

    //流浪详情表
    gethomelessdetails:async (ctx,next)=>{
        let data=await homelessDAO.gethomelessdetails(ctx.params.homeId);
        try{
            ctx.body = {"code":200,"message":"ok",data:data[0]};
            return data[0];
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //寻宠启示
    getlostPets:async (ctx,next)=>{
    let data=await lostPetsDAO.getlostPets(ctx.params.homeId);
        try{
            ctx.body = {"code":200,"message":"ok",data:data[0]};
            return data[0];
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //寻宠启示详情表
    detailIf:async (ctx,next)=>{
    let data=await  DetailDAO.detailIf(ctx.params.userId);
    try{
        ctx.body = {"code":200,"message":"ok",data:data};
        return data;
    }catch(err){
        ctx.body = {"code":500,"message":err.toString(),data:[]}
    }
},
    //获取丢失宠物信息（）
    getlost:async (ctx,next)=>{
        let data=await  lostPetsDAO.getlost();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //获取寻宠消息表里内容
    getlostMess:async (ctx,next)=>{
        let data=await  lostMessDAO.getlostMess();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除流浪信息
    delhomeless:async (ctx,next)=>{
        //1.收集数据
        // console.log(ctx.params.homeId);
        let homeId = ctx.params.homeId;
        try{
            // console.log("homeId:   " + homeId)
            await homelessDAO.delhomeless(homeId);
            ctx.body = {"code":200,"message":"ok",data:'成功删除流浪宠物信息'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除寻宠信息
    dellostPets:async (ctx,next)=>{
        //1.收集数据
        let lpId = ctx.params.lpId;
        try{
            // console.log("lpId:   " + lpId)
            await lostPetsDAO.dellostPets(lpId);
            ctx.body = {"code":200,"message":"ok",data:'成功删除寻宠启示表信息'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除寻宠消息表信息
    dellostMess:async (ctx,next)=>{
        //1.收集数据
        let lmId = ctx.request.body.lmId;
        try{
            await lostMessDAO.dellostMess(lmId);
            ctx.body = {"code":200,"message":"ok",data:'成功删除寻宠消息表信息'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //系统消息表
    getsysmes:async (ctx,next) => {
        let data=await  sysmesDAO.getsysmes();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
        },
}
