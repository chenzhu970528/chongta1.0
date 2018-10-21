const router = require('koa-router')()
const homelesscontrollers=require('../controllers/homelesscontrollers')

//homeless根路由
router.prefix('/homeless')
//查看系统消息
router.get('/getsysmes',async (ctx,next)=>{
    await homelesscontrollers.getsysmes(ctx,next)
})

module.exports = router;
