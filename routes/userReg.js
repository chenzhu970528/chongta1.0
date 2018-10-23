const router = require('koa-router')();
const users=require('../controllers/users');
const userReg = require('../model/usersDAO');
//添加~
router.prefix('/user');
//用户填信息
router.post('/add',async (ctx,next)=>{
    let jsondata = await users.addUsers(ctx,next);
    console.log(jsondata)
});
router.get('/showUser/:userId',async (ctx,next)=>{
    let show = await userReg.showUser(ctx.params.userId);
    ctx.body = {"code":200,"message":"ok",data:show}
});
//用户修改信息
router.post('/mod',async (ctx,next)=>{
    let jsondata = await users.modUsers(ctx,next);
    console.log(jsondata);
});
//登录
router.post('/login',async (ctx,next)=>{
    let jsondata2 = await users.login(ctx,next);
    console.log(jsondata2);
});
// 显示用户量
router.get('/num',async (ctx,next)=>{
    let tol = await userReg.showNum();
    let tolAll=parseInt(tol[0].num)
    ctx.body = {"code":200,"message":"ok",data:tolAll}
});
module.exports = router;