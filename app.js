const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const adoptions = require('./routes/adoptions')

const matchmaking = require('./routes/matchmaking')

const homeless= require('./routes/homeless')

const forumSee = require('./routes/forumSee')
const forumAdd = require('./routes/forumAdd')
const forumDel = require('./routes/forumDel')

const userReg = require('./routes/userReg')



// error handler
onerror(app)
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

//实现跨域允许
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
})

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(adoptions.routes(), adoptions.allowedMethods())
app.use(matchmaking.routes(), matchmaking.allowedMethods())

app.use(homeless.routes(), homeless.allowedMethods())

app.use(forumSee.routes(), forumSee.allowedMethods())
app.use(forumAdd.routes(), forumAdd.allowedMethods())
app.use(forumDel.routes(), forumDel.allowedMethods())

app.use(userReg.routes(), userReg.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
