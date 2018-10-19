var adoptionsDAO = require('../model/adoptionsDAO')
var adoDetailsDAO = require('../model/adoDetailsDAO')
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
        //1.收集数据
        let art = {};
        art.userId = ctx.request.body.userId;
        art.adoAddress = ctx.request.body.adoAddress;
        art.adoTitle = ctx.request.body.adoTitle;
        art.detail = ctx.request.body.detail;
        art.adoType = ctx.request.body.adoType;
        art.limitTime = ctx.request.body.limitTime;
        art.birth = ctx.request.body.birth;
        art.petType = ctx.request.body.petType;
        art.sex = ctx.request.body.sex;
        art.age = ctx.request.body.age;
        try{
            //2.调用用户数据访问对象的添加方法
            await adoptionsDAO.addAdoptions(art)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:art}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
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
    }
}