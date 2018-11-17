const Router = require('koa-router')
const mysql = require('../mysql')
const util = require('../util')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
    // let datas = await mysql.queryId()
    // let cleanData = util.CleanData(datas.data)
    // ctx.body = {
    //     "code": 1,
    //     "data": cleanData,
    //     "sort": datas.sort,
    //     "mesg": 'ok'
    // }
    ctx.body ="idnex"
})


// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
    console.log(ctx.query)
    ctx.body = '404'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 子路由2
let taobao = new Router()
taobao.get('/index', async ( ctx )=>{
    const obj = ctx.query
    const arr = Object.keys(obj)
    let datas;
    if(arr < 1) {
        datas = await mysql.query()
    }else {
        datas = await mysql.query(obj.sort, obj.limit)
    }
    
    let cleanData = util.CleanData(datas.data)
    ctx.body = {
        "code": 1,
        "data": cleanData,
        "sort": datas.sort,
        "mesg": 'ok'
    }
}).get('/item', async ( ctx )=>{
    const obj = ctx.query
    const arr = Object.keys(obj)
    let datas;
    if (arr < 1) {
        datas = await mysql.queryId()
    } else {
        datas = await mysql.queryId(obj.sort, obj.id)
    }

    let cleanData = util.CleanData(datas)
    ctx.body = {
        "code": 1,
        "data": cleanData,
        // "sort": datas.sort,
        "mesg": 'ok'
    }
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/taobao', taobao.routes(), taobao.allowedMethods())

module.exports = router