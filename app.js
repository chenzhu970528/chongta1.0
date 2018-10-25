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
const homeless = require('./routes/homeless')
const sysmes=require('./routes/sysmes')

const forumSee = require('./routes/forumSee')
const forumAdd = require('./routes/forumAdd')
const forumDel = require('./routes/forumDel')

const userReg = require('./routes/userReg')
const matchmaking = require('./routes/matchmaking')

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
const cors = require("koa2-cors");
const session = require("koa-session");
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */ //
    signed: false, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

app.use(cors({
    origin: function (ctx) {
        // return 'http://localhost:8080';
        return "http://10.40.4.36:8080"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// app.use(async (ctx, next) => {
//     ctx.set("Access-Control-Allow-Origin", "*");
//     await next();
// })

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
app.use(sysmes.routes(), sysmes.allowedMethods())

app.use(forumSee.routes(), forumSee.allowedMethods())
app.use(forumAdd.routes(), forumAdd.allowedMethods())
app.use(forumDel.routes(), forumDel.allowedMethods())

app.use(userReg.routes(), userReg.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
