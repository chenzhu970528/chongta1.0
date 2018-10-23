var maplyDAO = require('../model/maplyDAO')
var matchmakingDAO = require('../model/matchmakingDAO');
var maplyDelDAO = require('../model/maplyDelDAO');
module.exports = {
    addaply:async (ctx,next) => {
        //1.收集数据
        let apldata= { };
        apldata.aplyId=ctx.request.body.aplyId;
        apldata.matId=ctx.request.body.matId;
        apldata.detail= ctx.request.body.detail;
        apldata.petPic=ctx.request.body.petPic;
        apldata.age=ctx.request.body.age;
        apldata.birth=ctx.request.body.birth;
        apldata.type=ctx.request.body.type;
        apldata.sex=ctx.request.body.sex;
        apldata.PetName=ctx.request.body.PetName;
        try{
            await maplyDAO.addaply(apldata)
            await  maplyDelDAO.addaplyDel(apldata.aplyId,apldata.matId)
            // console.log(apldata)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:apldata}

        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    addMatch:async (ctx,next) => {
        let users= { };
        users.relId=ctx.request.body.relId;
        users.title=ctx.request.body.title;
        users.sandword=ctx.request.body.sandword;
        users.request=ctx.request.body.request;
        users.detail=ctx.request.body.detail;
        users.birth=ctx.request.body.birth;
        users.type=ctx.request.body.type;
        users.sex=ctx.request.body.sex;
        users.petPic=ctx.request.body.petPic;
        users.age=ctx.request.body.age;
        users.PetName=ctx.request.body.PetName;
        try{
            await matchmakingDAO.addMatch(users)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:users}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    delAply:async (ctx,next) => {
        let mdel={ };
        mdel.aplyId=ctx.request.body.aplyId;
        mdel.matId=ctx.request.body.matId;
        try{
            await  maplyDAO.delAplDel(mdel)
            await maplyDAO.delAply(mdel)
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
        let delaplydata=ctx.request.body.matId;
        try{
            await  matchmakingDAO.deladel(delaplydata)
            await  matchmakingDAO.delapl(delaplydata)
            await matchmakingDAO.delmatch(delaplydata)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:'删除成功'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    agreeMatch:async (ctx,next) => {
        let agree={ };
        agree.matId=ctx.request.body.matId;
        agree.aplyId=ctx.request.body.aplyId;
        try{
            await  maplyDelDAO.agreeMatch(agree);
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:agree}
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