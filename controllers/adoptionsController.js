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
        art.adoTitle = ctx.request.body.adoTitle;
        art.detail = ctx.request.body.detail;
        art.adoType = ctx.request.body.adoType;
        art.limitTime = ctx.request.body.limitTime;
        art.birth = ctx.request.body.birth;
        art.petType = ctx.request.body.petType;
        art.sex = ctx.request.body.sex;
        art.adoPic = ctx.request.body.adoPic;
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
    }
}