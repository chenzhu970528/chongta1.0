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
//发布领养信息，找主人
router.post('/Add',async (ctx,next)=>{
    await homelesscontrollers.addhomeless(ctx,next)
})
//发布丢失信息，找主人
router.post('/lost',async (ctx,next)=>{
    await homelesscontrollers.addlostPets(ctx,next)
})

//寻宠启示表
router.get('/lostPets/:userId',async (ctx,next)=>{
    // let jsondata=await lostPetsDAO.getlostPets();
    await homelesscontrollers.getlostPets(ctx,next);
})

//寻宠启示详情信息
router.get('/lostPets/lostDetails/:userId',async (ctx,next)=>{
    // let ldjson=await DetailDAO.detailIf(ctx.params.userId);
    await homelesscontrollers.detailIf(ctx,next);
})

//寻宠消息表信息
router.get('/lostMess',async (ctx,next)=>{
    // let jsondata=await lostMessDAO.getlostMess();
    await homelesscontrollers.getlostMess(ctx,next);
})
//删除流浪信息
router.post('/adohomeless',async (ctx,next)=>{
    await homelesscontrollers.delhomeless(ctx,next)
})
//删除寻宠启示表信息
router.post('/adolostpets',async (ctx,next)=>{
    await homelesscontrollers.dellostPets(ctx,next)
})
//删除寻宠消息表信息
router.post('/adolostMess',async (ctx,next)=>{
    await homelesscontrollers.dellostMess(ctx,next)
})
module.exports = router;
