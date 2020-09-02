const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

const request = require('./request')

const app = new Koa()

app.use(cors())
app.use(koaBody())

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
require('./socket/index')(io)

app.use(async ctx => {
    const {body} = await request(ctx.method, ctx.url, ctx.request.body)

    const data = JSON.parse(body)
    if (data.error) {
        ctx.status = 501
        return ctx.body = {
            message: data.error.message
        }
    }

    ctx.type = 'json'
    ctx.body = body
})

server.listen(3000)
