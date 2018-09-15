const router = require('koa-router')()
const homelessDAO = require('../model/homelessDAO')
const homelesscontrollers=require('../controllers/homelesscontrollers')

//homeless根路由
router.prefix('/homeless')

router.get('/',async (ctx,next)=>{
    let jsondata = await homelessDAO.getHomeless();
    console.log(jsondata)
    await ctx.render('homeless',{title:'领养信息',data:jsondata})
})
router.get('/Add',async (ctx,next)=>{
    let jsondata=await homelesscontrollers.addhomeless(ctx,next);
    console.log(jsondata)
})

module.exports = router
