const router = require('koa-router')()
const adoptionsDAO = require('../model/adoptionsDAO')
const adoDetailsDAO = require('../model/adoDetailsDAO')
const adoptionsCtroller = require('../controllers/adoptionsController')
//adoptions根路由
router.prefix('/adoptions')
//获取领养信息
router.get('/',async (ctx,next)=>{
    await adoptionsCtroller.getAdoptions(ctx,next)

})
//发布领养信息
router.post('/adoAdd',async (ctx,next)=>{
    await adoptionsCtroller.addAdoptions(ctx,next)
})

//查看领养详细信息
router.get('/details/:adoId', async (ctx,next)=>{
    await adoptionsCtroller.getAdoDetails(ctx,next)
})

//查看领养详情，查看本人发布的
router.get('/adodetails/:userId',async (ctx,next)=>{
    let jsondata=await adoDetailsDAO.getAdoptionsdetail(ctx.params.userId);
    console.log(jsondata)
    ctx.body={"code":200,"message":"ok",data:jsondata}
})

// 查看领养者详情
router.get('/getOneUser/:userId',async (ctx,next)=>{
    await adoptionsCtroller.getAdoUser(ctx,next)
})
// 删除领养信息
router.post('/adoDel',async (ctx,next)=>{
    await adoptionsCtroller.delAdoptions(ctx,next)
})
// 添加申请领养
router.post('/adoAddApply',async (ctx,next)=>{
    await adoptionsCtroller.addAdoApply(ctx,next)
})
//删除领养申请
router.post('/adoDelApply',async (ctx,next)=>{
    await adoptionsCtroller.delAdoApply(ctx,next)
})
// 同意领养
router.post('/adoAgree',async (ctx,next)=>{
    await adoptionsCtroller.adoAgree(ctx,next)
})
// 热门
router.get('/getHot',async (ctx,next)=>{
    let hot=await adoDetailsDAO.getHot();
    ctx.body = {"code":200,"message":"ok",data:hot}

})
module.exports = router
