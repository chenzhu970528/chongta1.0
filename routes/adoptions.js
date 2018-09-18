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

// 查看领养者详情
router.get('/getOneUser/:userId',async (ctx,next)=>{
    await adoptionsCtroller.getAdoUser(ctx,next)
})
// 删除领养信息

// 添加有意领养

module.exports = router
