import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io(process.env.socketUrl);
Vue.use(VueSocketIOExt, socket);
