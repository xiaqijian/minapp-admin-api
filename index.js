const Koa = require('koa')
const config = require('./config/default')
const router = require('./router')

const app =  new Koa()

app.use(router.routes()).use(router.allowedMethods())

 



app.listen(config.port)

console.log(`listening on port ${config.port}`)