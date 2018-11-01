var maplyDAO = require('../model/maplyDAO')
var matchmakingDAO = require('../model/matchmakingDAO');
var maplyDelDAO = require('../model/maplyDelDAO');
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require('moment')
module.exports = {


    addaply:async (ctx,next) => {
        var pics = '';//保存所有图片
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/matchaplyUpload'    //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            //1.收集数据
            let apldata = {};
            apldata.aplyId = fields.aplyId;
            apldata.matId = fields.matId;
            apldata.detail = fields.detail;
            apldata.petPic = fields.petPic;
            apldata.age = fields.age;
            apldata.birth = fields.birth;
            apldata.type = fields.type;
            apldata.sex = fields.sex;
            apldata.PetName = fields.PetName;
            //1.收集数据
            // console.log(files)
            for (var i = 0; i < files.filename.length; i++) {
                var filename = files.filename[i].name;
                var src = path.join(__dirname, files.filename[i].path); //获取源文件全路径
                // console.log(src)
                //获取更名后的文件名(不包含路径)
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics += "/uploadfile/matchaplyUpload/" + fileDes + ",";
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                // console.log(fileDes)
            }
            apldata.petPic=pics
            // console.log(art)

            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作

            //根据fields.mydata获取上传表单元素的数据，执行写入数据库的操作
            try {
                await maplyDAO.addaply(apldata)
                await maplyDelDAO.addaplyDel(apldata.aplyId, apldata.matId)
                // console.log(apldata)
                //3.反馈结果
                ctx.body = {"code": 200, "message": "ok", data: apldata}
            } catch (err) {
                ctx.body = {"code": 500, "message": err.toString(), data: []}
            }
                if(err){
                    ctx.body='上传失败'
                }
        })
        ctx.body='上传成功'
    },


    addMatch:async (ctx,next) => {
        var pics = '';//保存所有图片
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/matchUpload'    //设置文件存放路径
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req, async function (err, fields, files) {
            //1.收集数据
            let art = {};
            // console.log(fields.userId)
            art.relId = fields.relId;
            art.title = fields.title;
            art.sandword = fields.sandword;
            art.detail = fields.detail;
            art.request = fields.request;
            art.age = fields.age;
            art.birth = fields.birth;
            art.type = fields.type;
            art.sex = fields.sex;
            art.PetName = fields.PetName;
            // console.log(files)
            for (var i = 0; i < files.filename.length; i++) {
                var filename = files.filename[i].name;
                var src = path.join(__dirname, files.filename[i].path)//获取源文件全路径
                // console.log(src)
                //获取更名后的文件名(不包含路径)
                var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
                pics += "/uploadfile/matchUpload/" + fileDes + ",";
                // 更名同步方式
                fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
                // console.log(fileDes)
            }
            art.petPic=pics
            // console.log(art)

            //根据files.filename.name获取上传文件名，执行后续写入数据库的操作

            //根据fields.mydata获取上传表单元素的数据，执行写入数据库的操作
            try{
                //2.调用用户数据访问对象的添加方法
                await matchmakingDAO.addMatch(art)
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
    delAply:async (ctx,next) => {
        let mdel={ };
        mdel.aplyId=ctx.params.aplyId;
        mdel.matId=ctx.params.matId;
        try{
            await  maplyDAO.delAplDel(mdel);
            await maplyDAO.delAply(mdel);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:'删除成功'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    changeaply:async (ctx,next) => {
        let changeaplydata ={ };
        changeaplydata.detail=ctx.request.body.detail;
        changeaplydata.petPic=ctx.request.body.petPic;
        changeaplydata.address=ctx.request.body.address;
        changeaplydata.medReport=ctx.request.body.medReport;
        changeaplydata.age=ctx.request.body.age;
        changeaplydata.birth=ctx.request.body.birth;
        changeaplydata.type=ctx.request.body.type;
        changeaplydata.sex=ctx.request.body.sex;
        changeaplydata.PetName=ctx.request.body.PetName;
        changeaplydata.maHistory=ctx.request.body.maHistory;
        changeaplydata.maplyId=ctx.request.body.maplyId;
        try{
            await maplyDAO.changeaply(changeaplydata)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:changeaplydata}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delMatch:async (ctx,next) => {
        let matId=ctx.params.matId;
        try{
            await  matchmakingDAO.deladel(matId);
            await  matchmakingDAO.delapl(matId);
            await matchmakingDAO.delmatch(matId);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:'删除成功'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    agreeMatch:async (ctx,next) => {
        let agree={ };
        agree.matId=ctx.params.matId;
        agree.aplyId=ctx.params.aplyId;
        try{
            await  maplyDelDAO.agreeMatch1(agree);
            await  maplyDelDAO.agreeMatch(agree.matId);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:'更改成功'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    updataF:async (ctx,next)=>{
        let matId=ctx.request.body.matId;
        try{
            await matchmakingDAO.updateF(matId);
            ctx.body = {"code":200,"message":"ok",data:'不通过'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    updataT:async (ctx,next)=>{
        let matId=ctx.request.body.matId;
        try{
            await matchmakingDAO.updateT(matId);
            ctx.body = {"code":200,"message":"ok",data:'通过'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
}