'use strict'
const WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8090})

let wordArr = ['花神庙', '神精病', '直升飞机', '氧化', '女孩']

wss.on('connection', function(ws) {
    console.log('connected.')//打开画布连接
	//获取一个关键词
    let keyWord = ((arr) => {
            let num = Math.floor(Math.random()*arr.length)
            return arr[num]
        })(wordArr)
	//向客户端（猜词）响应
    ws.on('message', function(message) {
		//console.log(ws.clients.query)
        console.log('received: %s', message)
		if(0){
			console.log('no port')//非当前端口
		}
		else{
		console.log(message)
		console.log(keyWord)
        if (message == keyWord) {//猜词画布数据
            console.log('correct')
            wss.clients.forEach((client) => {//客户端响应
                client.send('ok')
            })
        } else {
            console.log('wrong')
            wss.clients.forEach((client) => {
                client.send(message)
            })
        }
		
		}
    })
	//向客户端（画布）发送关键词
    wss.clients.forEach((client) => {//向打开的画布客户端发送关键词
        client.send('keyword:' + keyWord)
    })
})