const router = require('koa-router')();
const matchmakingDAO = require('../model/matchmakingDAO')
const maplycontroller = require('../controllers/maplycontroller')
const maplyDAO = require('../model/maplyDAO')
const maplyDelDAO = require('../model/maplyDelDAO')

// 婚介首页
router.prefix('/matchmaking')

router.get('/',async (ctx,next)=>{
    let mjsondata =  await matchmakingDAO.getMatchList();
    console.log(mjsondata)
    // await ctx.render('matchmaking',{title:'婚介首页列表',data:mjsondata})
    ctx.body = {"code":200,"message":"ok",data:mjsondata }
})

// 获取宠物相关信息
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
router.post('/addMatch',async (ctx,next)=>{
    await maplycontroller.addMatch(ctx,next);
})

//删除婚介发布
// router.get('/delMatch',async (ctx,next)=>{
//     await  maplycontroller.delMatch(ctx,next);
// })

//删除相关del
router.get('/delMatchAll/:matId',async (ctx,next)=>{
    await  maplycontroller.delMatch(ctx,next);
})
// 通过审核
router.post('/updataT',async (ctx,next)=>{
    await maplycontroller.updataT(ctx,next)
})

// 不通过
router.post('/updataF',async (ctx,next)=>{
    await maplycontroller.updataF(ctx,next)
})
// 列表排序
router.get('/sortTimeDESC',async (ctx,next)=>{
    let sortTimeDESC = await matchmakingDAO.sortTimeDESC();
    ctx.body = {"code":200,"message":"ok",data:sortTimeDESC}
})
router.get('/sortTimeASC',async (ctx,next)=>{
    let sortTimeASC = await matchmakingDAO.sortTimeASC();
    ctx.body = {"code":200,"message":"ok",data:sortTimeASC}
})
router.get('/sortHotDESC',async (ctx,next)=>{
    let sortHotDESC = await matchmakingDAO.sortHotDESC();
    ctx.body = {"code":200,"message":"ok",data:sortHotDESC}
})
router.get('/sortHotASC',async (ctx,next)=>{
    let sortHotASC = await matchmakingDAO.sortHotASC();
    ctx.body = {"code":200,"message":"ok",data:sortHotASC}
})


// ---------------------------------------------------------
// 插入婚介申请数据
router.post('/addaply', async (ctx,next) => {
     await maplycontroller.addaply(ctx, next);
})
// 显示给被申请人的信息,接受的申请
router.get('/:userId/showaply',async (ctx,next)=>{
    let sajson = await maplyDAO.showaply(ctx.params.userId);
    console.log(sajson);
    ctx.body = {"code":200,"message":"ok",data:sajson}
})
// 显示本人的发出的申请
router.get('/:userId/sendaply',async (ctx,next)=>{
    let ssjson1 = await maplyDAO.sendaply1(ctx.params.userId);
    console.log(ssjson1)
    ctx.body = {"code":200,"message":"ok",data:ssjson1}
})
//删除申请请求
router.post('/delaply',async (ctx,next)=>{
    await maplycontroller.delAply(ctx,next);
})
//更改申请
router.post('/changeaply',async (ctx,next)=>{
    await maplycontroller.changeaply(ctx,next);
})
// 热门
router.get('/countAply',async (ctx,next)=>{
    let cajson = await maplyDAO.countAply();
    ctx.body = {"code":200,"message":"ok",data:cajson}
});

//同意申请
router.post('/agree',async (ctx,next) => {
    await  maplycontroller.agreeMatch(ctx,next);
});
// 显示是否被同意
router.get('/showAgree/:aplyId',async (ctx,next)=>{
    let SAdata = await maplyDAO.showAgree(ctx.params.aplyId);
    ctx.body = {"code":200,"message":"ok",data:SAdata}
});
router.get('/num',async (ctx,next)=>{
    let match = await matchmakingDAO.countM();
    let Ado = await matchmakingDAO.countA();
    let Forum = await matchmakingDAO.countF();
    let Home = await matchmakingDAO.countH();
    let all=parseInt(match[0].num)+parseInt(Ado[0].num)+parseInt(Home[0].num)+parseInt(Forum[0].num);
    ctx.body = {"code":200,"message":"ok",data:all}
});
module.exports = router