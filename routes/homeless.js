const router = require('koa-router')()
const homelessDAO = require('../model/homelessDAO')
const homelesscontrollers=require('../controllers/homelesscontrollers')
const lostPetsDAO=require('../model/lostPetsDAO')
const lostMessDAO=require('../model/lostMessDAO')
const DetailDAO=require('../model/DetailDAO')

//homeless根路由
router.prefix('/homeless')
//查看流浪信息
router.get('/',async (ctx,next)=>{
    // let jsondata = await homelessDAO.getHomeless();
    await homelesscontrollers.getHomeless(ctx,next)
})

// router.get('/gethomelessdetails/:homeId',async (ctx,next)=>{
//     // let jsondata = await homelessDAO.getHomeless();
//     await homelesscontrollers.gethomelessdetails(ctx,next)
// })
//发布领养信息，找主人
router.post('/Add',async (ctx,next)=>{
    await homelesscontrollers.addhomeless(ctx,next)
})
//发布丢失信息，找主人
router.post('/addlost',async (ctx,next)=>{
    await homelesscontrollers.addlostPets(ctx,next)
})
//流浪详情表,查看本人发布的
router.get('/details/:userId',async (ctx,next)=>{
    let jsondata=await lostPetsDAO.getidlostPets(ctx.params.userId);
    // console.log(jsondata)
    ctx.body={"code":200,"message":"ok",data:jsondata}
})
//丢失详情表,查看本人发布的
router.get('/getlostdetails/:userId',async (ctx,next)=>{
    let jsondata=await lostPetsDAO.getlostdetail(ctx.params.userId);
    // console.log(jsondata)
    ctx.body={"code":200,"message":"ok",data:jsondata}
})
//查看流浪详细信息
router.get('/homelessdetails/:homeId', async (ctx,next)=>{
    await homelesscontrollers.gethomelessdetails(ctx,next)
})
//查看丢失详细信息
router.get('/lostpetsdetails/:lpId', async (ctx,next)=>{
    await homelesscontrollers.getlostpetsdetails(ctx,next)
})
//查看state为1的丢失信息
router.get('/founded', async (ctx,next)=>{
    let Foundjson=await lostPetsDAO.founded();
    ctx.body={"code":200,"message":"ok",data:Foundjson}
    // await homelesscontrollers.founded(ctx,next)
})


//寻宠启示表
router.get('/lostPets/:homeId',async (ctx,next)=>{
    // let jsondata=await lostPetsDAO.getlostPets();
    await homelesscontrollers.getlostPets(ctx,next);
})

// router.get('/homelessdetail/:relId',async (ctx,next)=>{
//     let mdjsondata = await matchmakingDAO.getMdetail(ctx.params.relId);
//     console.log(mdjsondata)
//     ctx.body = {"code":200,"message":"ok",data:mdjsondata[0]}
// })

//寻宠启示详情信息
router.get('/lostPets/lostDetails/:homeId',async (ctx,next)=>{
    // let ldjson=await DetailDAO.detailIf(ctx.params.userId);
    await homelesscontrollers.detailIf(ctx,next);
})


//丢失信息
router.get('/lostPets',async (ctx,next)=>{
    // let jsondata=await lostMessDAO.getlostMess();
    await homelesscontrollers.getlost(ctx,next);
})

//更新state
router.post('/loststate',async (ctx,next)=>{
    await homelesscontrollers.loststate(ctx,next);
})
//寻宠消息表信息
router.get('/lostMess',async (ctx,next)=>{
    // let jsondata=await lostMessDAO.getlostMess();
    await homelesscontrollers.getlostMess(ctx,next);
})
//删除流浪信息,根据homeId
router.get('/delhomeless/:homeId',async (ctx,next)=>{
    await homelesscontrollers.delhomeless(ctx,next)
})
//删除寻宠信息，根据lpId
router.get('/dellostpets/:lpId',async (ctx,next)=>{
    await homelesscontrollers.dellostPets(ctx,next)
})
//删除寻宠消息表信息
router.post('/adolostMess',async (ctx,next)=>{
    await homelesscontrollers.dellostMess(ctx,next)
});
// 最新丢失
router.get('/getLatest',async (ctx,next)=>{
    let latest=await lostPetsDAO.getLatest();
    ctx.body={"code":200,"message":"ok",data:latest}
})
module.exports = router;
