<template>

<div>
  <span>
  <drawing-board v-if='this.player == 1'></drawing-board>
  <showing-board v-if='this.player == 2'></showing-board>
  </span>
   <span style="display:none;">
  <drawing-board v-if='this.player == 2.1'></drawing-board>
  <showing-board v-if='this.player == 2.2'></showing-board>
  </span>
</div>
<div>
  <span>
  <button class="botton" id="1" v-if='this.player == 0' @click='draw($event)'>我来画</button>
  <button class="botton" id="1" v-if='this.player == 0' @click='guess($event)'>我来猜</button>
  <button class="botton" id="1" v-if='this.player == 2' @click='replay($event)'>返回</button>
  </span>
  <span style="display:none;">
  <button class="botton" id="2" v-if='this.player == 0' @click='draw($event)'>我来画</button>
  <button class="botton" id="2" v-if='this.player == 0' @click='guess($event)'>我来猜</button>
  <button class="botton" id="2" v-if='this.player == 2.2' @click='replay($event)'>返回</button>
  </span>
  <span id="dv"  data_value="0" style="display:none;">temp</span>
</div>
</template>

<script>
import Vue from 'vue'

import DrawingBoard from './components/drawing-board.vue'
import showingBoard from './components/showing-board.vue'

export default {
    data() {
      return {
        player: 0,
		data_id: 0
      }
    },
    components: {
      DrawingBoard,
      showingBoard
    },
    methods: { 
      draw(event) {
		this.data_id = event.currentTarget.id,
		document.getElementById('dv').setAttribute('data_value',this.data_id),
        this.player = (this.data_id == 1 ? 1:this.data_id+'.1')
      },
      guess(event) {
		this.data_id = event.currentTarget.id,
		document.getElementById('dv').setAttribute('data_value',this.data_id),
        this.player = (this.data_id == 1 ? 2:this.data_id+'.2')
      },
      replay(event) {
		this.data_id = event.currentTarget.id,
		document.getElementById('dv').setAttribute('data_value',this.data_id),
        this.player = 0
        location.reload()
      }
    }
}
</script>

<style lang="less">
body {
  background: #fff;
  font: 16px/1 "Microsoft YaHei", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Helvetica, Arial, sans-serif;
}
.botton {
background-color: #3bb3e0;
padding: 10px;
position: relative;
font-family: 'Open Sans', sans-serif;
font-size: 12px;
text-decoration: none;
color: #fff;
border-radius: 5px;
margin-right: 10px;
}
.main {
	margin: 0 auto;
	text-align:center;
}
.banner{
	height:200px;
	margin: 0 auto;
	text-align:center;
	background-color: #808080 ;
	width: 20%;
}
</style>
