<template>
    <canvas id="showing" width="520" height="350" style="border: 1px solid #999;border-radius:10px;"></canvas>
    <div id="answer-box">
        <span>对方画的什么鬼东西: </span>
        <input id="answer" type="text" class="answer-input">
        <button id="submit" class="botton">提交</button>
    </div>
</template>

<script>
    'use strict'
    export default {
        ready() {
			let dv = document.getElementById('dv').getAttribute('data_value');
            const ws = new WebSocket('ws://localhost:8090'+'?dv='+dv);
			
            const canvas = document.getElementById('showing')
            const cxt = canvas.getContext('2d')
            let moveToSwitch = 1
			//处理服务器返回响应
            ws.onmessage = (msg) => {
              let pathObj = msg.data.split('.')
              cxt.strokeStyle = "#000"
              
              if (moveToSwitch && msg.data != 'stop' && msg.data != 'clear') {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[0], pathObj[1])
                  moveToSwitch = 0
              } else if (!moveToSwitch && msg.data == 'stop') {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[0], pathObj[1])
                  moveToSwitch = 1
              } else if (moveToSwitch && msg.data == 'clear') {
                  cxt.clearRect(0, 0, 522, 500)
              } else if (msg.data == 'ok') {
                  alert('(*@ο@*) 哇～，恭喜您答对了！！')
              }

              cxt.lineTo(pathObj[2], pathObj[3])
              cxt.stroke()
            }

            ws.onopen = () => {
                let submitBtn = document.getElementById('submit')
                submitBtn.onclick = () => {
                    let keyword = document.getElementById('answer').value
					//向服务器发送数据
                    ws.send(keyword)
                }
            }
        }
    }
</script>

<style lang="less">
    #showing {
        background: #D0EBE0;
    }
    #answer-box {
        margin: 10px 0;
    }
	.answer-input{
		width: 140px;
		height: 30px;
	}
</style>