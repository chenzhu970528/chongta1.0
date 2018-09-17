const router = require('koa-router')();
const matchmakingDAO = require('../model/matchmakingDAO')
const maplycontroller = require('../controllers/maplycontroller')
const maplyDAO = require('../model/maplyDAO')

// 婚介首页
router.prefix('/matchmaking')

router.get('/',async (ctx,next)=>{
    let mjsondata =  await matchmakingDAO.getMatchList();
    console.log(mjsondata)
    await ctx.render('matchmaking',{title:'婚介首页列表',data:mjsondata})
})
router.get('/search',async (ctx,next)=>{
    let msjsondata = await matchmakingDAO.getMatchSearch();
    console.log(msjsondata)
    ctx.body = {"code":200,"message":"ok",data:msjsondata}
})
router.get('/matchdetail/:relId',async (ctx,next)=>{
    let mdjsondata = await matchmakingDAO.getMdetail(ctx.params.relId);
    console.log(mdjsondata)
    ctx.body = {"code":200,"message":"ok",data:mdjsondata[0]}
})
router.get('/addMatch',async (ctx,next)=>{
    await maplycontroller.addMatch(ctx,next);
})

// 插入婚介申请数据
router.get('/matchdetail/:relId/aply',async (ctx,next)=>{
     await maplycontroller.addaply(ctx,next);
})
// 显示给被申请人的信息,接受的申请
router.get('/:userId/showaply',async (ctx,next)=>{
    let sajson = await maplyDAO.showaply(ctx.params.userId);
    console.log(sajson);
    ctx.body = {"code":200,"message":"ok",data:sajson}
})
// 显示本人的发出的申请
router.get('/:userId/sendaply',async (ctx,next)=>{
    let ssjson = await maplyDAO.sendaply(ctx.params.userId);
    console.log(ssjson);
    ctx.body = {"code":200,"message":"ok",data:ssjson}
})

module.exports = router