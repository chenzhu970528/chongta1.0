const router = require('koa-router')()
const adoptionsDAO = require('../model/adoptionsDAO')
const adoDetailsDAO = require('../model/adoDetailsDAO')
const adoptionsCtroller = require('../controllers/adoptionsController')
//adoptions根路由
router.prefix('/adoptions')
//获取领养信息
router.get('/',async (ctx,next)=>{
    let jsondata = await adoptionsDAO.getAdoptions();
    // console.log(jsondata)
    await ctx.render('adoptions',{title:'领养信息',data:jsondata})
})
//发布领养信息
router.get('/Add',async (ctx,next)=>{
    await adoptionsCtroller.addAdoptions(ctx,next)
})

//查看领养详细信息
router.get('/details/:adoId', async (ctx,next)=>{
    try{
        let jsondata = await adoDetailsDAO.getAdoDetails(ctx.params.adoId)
        // 获取有意领养者
        let jsondata2 = await adoDetailsDAO.getAdoDetailsMan(ctx.params.adoId)
        let datas ={}
        datas.jsondata = jsondata[0]
        datas.jsondata2 = jsondata2
        console.log(datas)
        await ctx.render('adoDetails',{data:datas});
    }
    catch (e) {
        console.log('无法找到当前信息， 错误：'+e.message)
    }
})

// 查看领养者详情
router.get('/getOneUser/:userId',async (ctx,next)=>{
    try{
        let jsondata = await adoDetailsDAO.getAdoUser(ctx.params.userId)
        console.log(jsondata)
        await ctx.render('adoUser',{title:'有意领养者',data:jsondata[0]});
    }
    catch (e) {
        console.log('无法找到当前信息， 错误：'+e.message)
    }
})
// 删除领养信息

// 添加有意领养
module.exports = router
