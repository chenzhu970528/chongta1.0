var homelessDAO = require('../model/homelessDAO')
module.exports = {
    addhomeless:async (ctx,next) => {
        //1.收集数据
        let homeless = {};
        homeless.homeId='4'
        homeless.userId= '4'
        homeless.homePic= '8.png'
        homeless.homeTime= '2018-09-13 14:44:16'
        homeless.detail= '返回的数据返回的时间'
        homeless.address= '苏州高博'


        try{
            //2.调用用户数据访问对象的添加方法
            await homelessDAO.addhomeless(homeless)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
}