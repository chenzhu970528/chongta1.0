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
router.post('/delMatch',async (ctx,next)=>{
    await  maplycontroller.delMatch(ctx,next);
})


// 插入婚介申请数据
router.post('/addaply', async (ctx,next) => {
     await maplycontroller.addaply(ctx, next);
})
// 显示给被申请人的信息,接受的申请
//post
router.get('/:userId/showaply',async (ctx,next)=>{
    let sajson = await maplyDAO.showaply(ctx.params.userId);
    console.log(sajson);
    ctx.body = {"code":200,"message":"ok",data:sajson}
})
// 显示本人的发出的申请
router.get('/:userId/sendaply',async (ctx,next)=>{
    let ssjson1 = await maplyDAO.sendaply1(ctx.params.userId);
    let ssjson2 = await maplyDAO.sendaply2(ctx.params.userId);
    var ssjson =[]
    console.log(ssjson1)
    console.log(ssjson2)
    for(var i=0;i< ssjson1.length;i++){
        ssjson.push(ssjson1[i])
    }
    for(var j=0;j< ssjson2.length;j++){
        ssjson.push(ssjson2[j])
    }
    // console.log(ssjson)
    ctx.body = {"code":200,"message":"ok",data:ssjson}
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
})



//同意申请
router.post('/agree',async (ctx,next) => {
    await  maplycontroller.agreeMatch(ctx,next);
})
// router.post('/addaplyDel',async (ctx,next)=>{
//     await
// })
module.exports = router