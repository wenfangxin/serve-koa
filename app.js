const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser');
const koabody = require('koa-body')
const logger = require('koa-logger')
const errCatch = require('./middlewares/exception');
const cors = require('koa2-cors');

const user = require('./routes/user')
/**
 * middlewares
 * 捕获错误 返回给前端异常信息
 * 一定要放在最前面
 */
app.use(errCatch);

// error handler
onerror(app)


//处理跨域
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token', 'uid'],
}));


// 支持文件上传
app.use(koabody({
    multipart: true, 
    //   encoding:'gzip',
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由注册
app.use(user.routes(), user.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('服务器错误', err, ctx)
});



/**
 * 将异常处理挂设置为全局
 */
global.err = require('./core/http-exception');

module.exports = app