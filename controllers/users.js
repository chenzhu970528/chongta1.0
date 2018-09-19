const userReg = require('../model/usersDAO');
var crypto = require('crypto')
module.exports = {

    //添加用户信息
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
        user.wechat = ctx.request.body.wechat;
        user.realName = ctx.request.body.realName;
        user.idPic = ctx.request.body.idPic;

        if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(ctx.request.body.idNo)) {
            user.idNo = ctx.request.body.idNo;
        } else {
            console.log('身份证格式错误')
        }
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
        user.wechat = ctx.request.body.wechat;
        user.userId = ctx.request.body.userId;
        try {
            let data=await userReg.modUsers(user)
            ctx.body = {"code": 200, "message": "ok", data: user}
        } catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    },
    //用户登录
    login: async (ctx, next) => {
        let user = {};
        user.userPhone = ctx.request.body.userPhone;
        let pwd = ctx.request.body.userPwd;
        const hash = crypto.createHash('md5');
        hash.update(pwd);
        let pwdMd5 = hash.digest('hex');
        user.userPwd =pwdMd5
        let data =await userReg.login(user)
        console.log(data)
        try {
                ctx.body = {"code": 200, "message": "ok", data:data}
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data:[]}
        }
    }

}