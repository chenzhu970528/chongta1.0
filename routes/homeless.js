const router = require('koa-router')()
const homelessDAO = require('../model/homelessDAO')
const homelesscontrollers=require('../controllers/homelesscontrollers')
const lostPetsDAO=require('../model/lostPetsDAO')
const lostMessDAO=require('../model/lostMessDAO')
const DetailDAO=require('../model/DetailDAO')

//homeless根路由
router.prefix('/homeless')

router.get('/',async (ctx,next)=>{
    let jsondata = await homelessDAO.getHomeless();
    await ctx.render('homeless',{title:'流浪信息',data:jsondata})
})
router.get('/Add',async (ctx,next)=>{
    let jsondata=await homelesscontrollers.addhomeless(ctx,next);
})
router.get('/lostPets',async (ctx,next)=>{
    let jsondata=await lostPetsDAO.getlostPets();
    await ctx.render('lostPets',{title:'寻宠启示表',data:jsondata})
})
router.get('/lostPets/lostDetails/:userId',async (ctx,next)=>{
    let ldjson=await DetailDAO.detailIf(ctx.params.userId);
    await ctx.render('lostDetails',{title:'寻宠启示详情表',data:ldjson[0]})
})
router.get('/lostMess',async (ctx,next)=>{
    let jsondata=await lostMessDAO.getlostMess();
    await ctx.render('lostMess',{title:'寻宠消息表',data:jsondata})
})
module.exports = router
