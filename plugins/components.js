import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import VueGtag from 'vue-gtag'

// const socket = io('http://localhost:3333')
const socket = io('https://socket.clubquarantaene.stream')
Vue.use(VueSocketIOExt, socket)
// Vue.use(require('vue-moment'))
Vue.use(VueGtag, {
  config: { id: 'UA-161932716-1' },
  enabled: false
})
