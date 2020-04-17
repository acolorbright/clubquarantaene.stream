import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

// const socket = io('http://localhost:3333')
const socket = io('https://socket.clubquarantaene.stream');
Vue.use(VueSocketIOExt, socket);
