var homelessDAO = require('../model/homelessDAO')
var DetailDAO=require('../model/DetailDAO')
var lostMessDAO=require('../model/lostMessDAO')
var lostPetsDAO=require('../model/lostPetsDAO')
var sysmesDAO=require('../model/sysmesDAO')

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
        //1.收集数据
        let art = {};
        art.getmes = ctx.request.body.getmes;
        art.userId = ctx.request.body.userId;
        art.homePic = ctx.request.body.homePic;
        art.detail = ctx.request.body.detail;
        art.address = ctx.request.body.address;
        art.type = ctx.request.body.type;
        art.people = ctx.request.body.people;
        art.phone = ctx.request.body.phone;
        art.homeTime = ctx.request.body.homeTime;
        art.sex = ctx.request.body.sex;
        try{
            //2.调用用户数据访问对象的添加方法
            await homelessDAO.addhomeless(art)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:art}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    // 发布丢失信息，找宠物
    addlostPets:async (ctx,next) => {
        //1.收集数据
        let art = {};
        art.lpmes = ctx.request.body.lpmes;
        art.lppic = ctx.request.body.lppic;
        art.lpTime = ctx.request.body.lpTime;
        art.address = ctx.request.body.address;
        art.lostpeople = ctx.request.body.lostpeople;
        art.lostphone = ctx.request.body.lostphone;
        art.detail = ctx.request.body.detail;
        art.reward = ctx.request.body.reward;
        art.sex=ctx.request.body.sex;
        art.type=ctx.request.body.type;

        try{
            //2.调用用户数据访问对象的添加方法
            await homelessDAO.addlostPets(art)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:art}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
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
    let data=await lostPetsDAO.getlostPets(ctx.params.userId);
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
        let homeId = ctx.request.body.homeId;
        try{
            await homelessDAO.delhomeless(homeId);
            ctx.body = {"code":200,"message":"ok",data:'成功删除流浪宠物信息'}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    //删除寻宠启示表信息
    dellostPets:async (ctx,next)=>{
        //1.收集数据
        let lpId = ctx.request.body.lpId;
        try{
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
