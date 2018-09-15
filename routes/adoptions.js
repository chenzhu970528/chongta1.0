const router = require('koa-router')()
const adoptionsDAO = require('../model/adoptionsDAO')
const adoptionsCtroller = require('../controllers/adoptionsController')
//adoptions根路由
router.prefix('/adoptions')
//获取领养信息
router.get('/',async (ctx,next)=>{
    let jsondata = await adoptionsDAO.getAdoptions();
    console.log(jsondata)
    await ctx.render('adoptions',{title:'领养信息',data:jsondata})
})
//发布领养信息
router.get('/Add',async (ctx,next)=>{
    await adoptionsCtroller.addAdoptions(ctx,next)
})

module.exports = router
