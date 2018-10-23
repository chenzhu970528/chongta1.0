var adoptionsDAO = require('../model/adoptionsDAO')
var adoDetailsDAO = require('../model/adoDetailsDAO')
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require('moment')
module.exports = {

    // 获取领养信息
    getAdoptions: async (ctx,next) =>{
        let data = await adoptionsDAO.getAdoptions();
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // 发布领养信息
    addAdoptions:async (ctx,next) => {
        var pics = '';//保存所有图片
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/adoUpload'    //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            //1.收集数据
            let art = {};
            // console.log(fields.userId)
            art.userId = fields.userId;
            art.adoAddress = fields.adoAddress;
            art.adoTitle = fields.adoTitle;
            art.detail = fields.detail;
            art.adoType = fields.adoType;
            art.limitTime = fields.limitTime;
            art.birth = fields.birth;
            art.petType = fields.petType;
            art.sex = fields.sex;
            art.age = fields.age;
            // console.log(files)
            for (var i = 0; i < files.filename.length; i++) {
                var filename = files.filename[i].name;
                var src = path.join(__dirname, files.filename[i].path)//获取源文件全路径
                console.log(src)
                //获取更名后的文件名(不包含路径)
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics += "http://localhost:3000/uploadfile/adoUpload/" + fileDes + ",";
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                console.log(fileDes)
            }
            art.adoPic=pics
            console.log(art)

            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作

            //根据fields.mydata获取上传表单元素的数据，执行写入数据库的操作
            try{
                //2.调用用户数据访问对象的添加方法
               await adoptionsDAO.addAdoptions(art)
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
    //查看领养宠物详细信息
    getAdoDetails:async (ctx,next)=>{
        let jsondata = await adoDetailsDAO.getAdoDetails(ctx.params.adoId)
        // 获取有意领养者
        let jsondata2 = await adoDetailsDAO.getAdoDetailsMan(ctx.params.adoId)
        let data ={}
        data.jsondata = jsondata[0]
        data.jsondata2 = jsondata2
        try{
            ctx.body = {"code":200,"message":"ok",data:data};
            return data;
        }
        catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // 查看领养者详情
    getAdoUser:async(ctx,next)=>{
        let data = await adoDetailsDAO.getAdoUser(ctx.params.userId)
        try{
            ctx.body = {"code":200,"message":"ok",data:data[0]};
            return data[0];
        }
        catch (err) {
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除领养信息,对应的有意领养者信息表也删除
    delAdoptions:async (ctx,next)=>{
        //1.收集数据
        let adoId = ctx.request.body.adoId;
        try{
            await adoptionsDAO.delAdoMan(adoId)
            await adoptionsDAO.delAdoptions(adoId);
            ctx.body = {"code":200,"message":"ok",data:'成功删除宠物领养信息'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //添加领养申请
    addAdoApply:async (ctx,next)=>{
        let apply = {}
        apply.userId = ctx.request.body.userId;
        apply.adoId = ctx.request.body.adoId;
        try{
            await adoptionsDAO.addAdoApply(apply)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:apply}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除领养申请
    delAdoApply:async (ctx,next)=>{
        //1.收集数据
        let addId = ctx.request.body.addId;
        try{
            await adoptionsDAO.delAdoApply(addId)
            ctx.body = {"code":200,"message":"ok",data:'成功删除领养申请'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // 同意领养
    adoAgree:async (ctx,next)=>{
        let addId = ctx.request.body.addId;
        try{
            await adoptionsDAO.adoAgree(addId)
            ctx.body = {"code":200,"message":"ok",data:'领养已达成'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },

}