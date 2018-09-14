const router = require('koa-router')()
const adoptionsDAO = require('../model/adoptionsDAO')

//adoptions根路由
router.prefix('/adoptions')

router.get('/',async (ctx,next)=>{
    let jsondata = await adoptionsDAO.getAdoptions();
    console.log(jsondata)
    await ctx.render('adoptions',{title:'领养信息',data:jsondata})
})

module.exports = router
