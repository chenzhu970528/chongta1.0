const router = require('koa-router')()
const homelessDAO = require('../model/homelessDAO')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '宠它!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
