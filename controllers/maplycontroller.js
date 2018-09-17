var maplyDAO = require('../model/maplyDAO')
var matchmakingDAO = require('../model/matchmakingDAO')
module.exports = {
    addaply:async (ctx,next) => {
        //1.收集数据
        let apldata= { };
        apldata.address='北京'
        apldata.medReport='1.jpg'
        apldata.age=1
        apldata.type='猫'
        apldata.PetName='哈尼'
        apldata.maHistory=1
        apldata.detail= '最最活泼可爱'
        apldata.petPic='2.jpg'
        apldata.sex=1
        try{
            await maplyDAO.addaply(apldata)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:apldata}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    addMatch:async (ctx,next) => {
        let users= { };
        users.relId=5  //ctx.params.relId
        users.title='求一只健康的狗狗'
        users.sandword='要好相处'
        users.request='健康,博美'
        users.detail='这是一条详情描述'
        users.address='青岛'
        users.medReport='2.jpg'
        users.birth='2016-09-20'
        users.type='博美'
        users.sex=1
        users.petPic='22.jpg'
        users.age=3
        users.PetName='小可爱'
        users.maHistory=0
        try{
            await matchmakingDAO.addMatch(users)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:users}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
    changeaply:async (ctx,next) => {
        let changeaplydata= { };
        changeaplydata.detail=5  //ctx.params.relId
        changeaplydata.petPic='求一只健康的狗狗'
        changeaplydata.address='要好相处'
        changeaplydata.medReport='健康,博美'
        changeaplydata.age='这是一条详情描述'
        changeaplydata.type='青岛'
        changeaplydata.sex='2.jpg'
        changeaplydata.PetName='2016-09-20'
        changeaplydata.maHistory='博美'
        changeaplydata.matId=10
        changeaplydata.aplyId=3
        try{
            await matchmakingDAO.changeaply(changeaplydata)
            //3.反馈结果
            ctx.body = {"code":200,"message":"ok",data:changeaplydata}
        }catch(err){
            ctx.body = {"code":500,"message":err.toString(),data:[]}
        }
    },
}