var adoptionsDAO = require('../model/adoptionsDAO')
module.exports = {
    addAdoptions:async (ctx,next) => {
        //1.收集数据
        let adoptions = { };
        adoptions.userId = '7'
        adoptions.adoAddress = '北京'
        adoptions.adoTitle = '可爱萨摩耶求抱走'
        adoptions.detail = '1岁萨摩耶打过疫苗，不想养了，求好心人领养'
        try{
            //2.调用用户数据访问对象的添加方法
            await adoptionsDAO.addAdoptions(adoptions)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:[]}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    }
}