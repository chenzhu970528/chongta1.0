const router = require('koa-router')();
const users=require('../controllers/users')
//添加~
router.prefix('/user');
//用户填信息
router.post('/add',async (ctx,next)=>{
    let jsondata = await users.addUsers(ctx,next);
    console.log(jsondata)
});
//用户修改信息
router.post('/mod',async (ctx,next)=>{
    let jsondata = await users.modUsers(ctx,next);
    console.log(jsondata)
});
//登录
router.post('/login',async (ctx,next)=>{
    let jsondata2 = await users.login(ctx,next);
    console.log(jsondata2)
})
module.exports = router;