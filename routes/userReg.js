const router = require('koa-router')();
const users=require('../controllers/users')
//添加~
router.prefix('/user');
//用户填信息
router.post('/add',async (ctx,next)=>{
    let jsondata = await users.addUsers(ctx,next);
    console.log(jsondata)
});
router.post('/login',async (ctx,next)=>{
    let jsondata = await users.login(ctx,next);
    console.log(jsondata)
})
module.exports = router;