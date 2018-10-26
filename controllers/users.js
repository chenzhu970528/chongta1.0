const userReg = require('../model/usersDAO');
var crypto = require('crypto')
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require('moment')
module.exports = {
    // 修改密码
    modUserPwd:async (ctx,next) =>{
        let user = {};
        user.userId = ctx.request.body.userId
        let pwd = ctx.request.body.userPwd;
        const hash = crypto.createHash('md5');
        hash.update(pwd);
        let pwdMd5 = hash.digest('hex');
        user.userPwd =pwdMd5;
        try {
            await userReg.modUserPwd(user)
            ctx.body = {"code": 200, "message": "ok", data: user}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //添加用户信息 注册
    addUsers: async (ctx, next) => {
        let user = {};
        user.userName = ctx.request.body.userName;
        user.headPic = ctx.request.body.headPic;
        user.signature = ctx.request.body.signature;
        user.userPhone = ctx.request.body.userPhone;
        let pwd = ctx.request.body.userPwd;
        const hash = crypto.createHash('md5');
        hash.update(pwd);
        let pwdMd5 = hash.digest('hex');
        user.userPwd =pwdMd5
        if (/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(ctx.request.body.userEmail)) {
            user.userEmail = ctx.request.body.userEmail;
        } else {
            console.log('邮箱格式错误')
        }
        if (/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(ctx.request.body.userPhone)) {
            user.userPhone = ctx.request.body.userPhone;
        } else {
            console.log('手机号格式错误')
        }

        user.sex = ctx.request.body.sex;
        user.address = ctx.request.body.address;
        // user.realName = ctx.request.body.realName;
        // user.idPic = ctx.request.body.idPic;
        //
        // if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(ctx.request.body.idNo)) {
        //     user.idNo = ctx.request.body.idNo;
        // } else {
        //     console.log('身份证格式错误')
        // }
        try {
            let data=await userReg.addUsers(user)
            ctx.body = {"code": 200, "message": "ok", data: user}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //修改用户信息
    modUsers: async (ctx, next) => {
        let user = {};
        user.userName = ctx.request.body.userName;
        user.headPic = ctx.request.body.headPic;
        user.signature = ctx.request.body.signature;
        let pwd = ctx.request.body.userPwd;
        const hash = crypto.createHash('md5');
        hash.update(pwd);
        let pwdMd5 = hash.digest('hex');
        user.userPwd =pwdMd5
        if (/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(ctx.request.body.userEmail)) {
            user.userEmail = ctx.request.body.userEmail;
        } else {
            console.log('邮箱格式错误')
        }
        if (/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(ctx.request.body.userPhone)) {
            user.userPhone = ctx.request.body.userPhone;
        } else {
            console.log('手机号格式错误')
        }
        user.sex = ctx.request.body.sex;
        user.wechat = ctx.request.body.wechat;
        user.userId = ctx.request.body.userId;
        try {
            let data=await userReg.modUsers(user)
            ctx.body = {"code": 200, "message": "ok", data: user}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //上传头像
    modUserPic: async (ctx,next)=>{
        var pics = '';//保存所有图片
        var form = new formidable.IncomingForm();
        form.uploadDir = '../public/uploadfile/headPic'    //设置文件存放路径
        var now = moment(new Date()).format('YYYYMMDDHHmmss')
        form.multiples = true;  //设置上传多文件
        form.parse(ctx.req,async function (err, fields, files) {
            //1.收集数据
            let art = {};
            art.userId = fields.userId;
            var filename = files.filename.name;
            var src = path.join(__dirname, files.filename.path)//获取源文件全路径
            var fileDes = path.basename(filename, path.extname(filename)) + now + path.extname(filename)
            pics = "/uploadfile/headPic/" + fileDes
            // 更名同步方式
            fs.renameSync(src, path.join(path.parse(src).dir, fileDes))
            // console.log(fileDes)
            art.headPic=pics
            try {
                await userReg.modUserPic(art)
                ctx.body = {"code": 200, "message": "ok", data: user}
            } catch (err) {
                ctx.body = {"code": 500, "message": err.toString(), data: []}
            }
            if(err){
                ctx.body='上传失败'
            }
        })
        ctx.body='上传成功'


    },
    //用户登录
    login: async (ctx, next) => {
        try {
            let user = {};
            let user1 = {};
            user.userPhone = ctx.request.body.userPhone;
            if (user.userPhone === "") {
                ctx.body = {"code": 500, "message": '用户名为空，请重新输入', data:1}
            }
            else {
                // let data = await userReg.loginPhone(user.userPhone)//用户名正确并返回个密码
                user1.userPhone = user.userPhone;

                //
                //
                // console.log('状态' + data)
                // console.log(data.length)
                //
                // if (data.length == 0) {
                //     // console.log('用户名不存在')
                //     ctx.body = {"code": 500, "message": '用户名不存在，请重新输入', data: data}
                //     console.log('用户名')
                // }
                // else {
                //     console.log('用户名，，，，，')

                    let pwd = ctx.request.body.userPwd;
                    const hash = crypto.createHash('md5');
                    hash.update(pwd);
                    let pwdMd5 = hash.digest('hex');
                    user1.userPwd = pwdMd5
                    // console.log(user.userPwd)
                    // if (user.userPwd === data[0].userPwd) {
                    //     user1.userPwd=user.userPwd;
                        let data = await userReg.login(user1)
                        // console.log(data)
                if(data.length == 0){
                    ctx.body = {"code": 500, "message": "用户名或密码错误，请重新输入", data:2}
                }
                else {    ctx.body = {"code": 200, "message": "登陆成功", data:data[0]}


                    }

                        // console.log(user.userPwd);

                    }


        }
        catch (err) {
            ctx.body = {"code": 500, "message": '服务器错误' + err.message, data: 3}
        }

    },
    // 显示个人信息
    showUser:async (ctx,next) => {
        let userId=ctx.request.body.userId;
        try{
            await  userReg.showUser(userId);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
}