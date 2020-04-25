<template>
  <div
    class="chat"
    :class="{
      'chat-gradient': maxChatHistory && messages.length >= maxChatHistory
    }"
  >
    <ChatHistory :messages="chatHistory" />
    <div class="chat-footer">
      <div class="chat-input chat-message-box">
        <span
          class="chat-history-indicator"
          :style="{ 'background-color': `rgb(${userData.userName})` }"
        />
        <input
          v-model="message"
          type="text"
          placeholder="Write a message..."
          :maxlength="maxLength"
        />
        <input
          type="submit"
          value="Send"
          :disabled="locked"
          @click="sendMsg()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ChatHistory from './ChatHistory';

export default {
  name: 'Chat',
  components: { ChatHistory },
  props: {
    showEnterLeaveMessage: {
      type: Boolean,
      default: false
    },
    roomName: {
      type: String,
      default: 'mainfloor'
    },
    maxChatHistory: {
      type: Number,
      default: 0
    },
    throttleTimer: {
      type: Number,
      default: 3000
    },
    maxLength: {
      type: Number,
      default: 300
    },
    fullSize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: '',
      locked: false,
      messages: []
    };
  },
  computed: {
    userData() {
      return this.$store.state.guest.userData;
    },
    chatHistory() {
      const messagesLength = this.messages.length;
      const lastMessagePos = this.messages.length - this.maxChatHistory;
      if (this.maxChatHistory && messagesLength >= this.maxChatHistory) {
        const slicedMsg = this.messages.slice(lastMessagePos, messagesLength);
        return slicedMsg;
      } else {
        return this.messages;
      }
    },
    isDev() {
      return process.env.isDev;
    }
  },
  watch: {
    locked(val) {
      if (!val) {
        return;
      }
      const vm = this;
      setTimeout(() => {
        vm.locked = false;
      }, this.throttleTimer);
    }
  },
  beforeMount() {
    this.$socket.client.emit('new-user', {
      room: this.roomName,
      uuid: this.userData.uuid,
      name: this.userData.userName
    });
  },
  mounted() {
    document.addEventListener('keypress', this.onKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.onKeyPress);

    this.$socket.client.emit('user-leave', this.roomName);
  },
  methods: {
    sendMsg() {
      // dont to anything when the message is empty
      if (
        this.message === null ||
        this.message.match(/^ *$/) !== null ||
        this.locked
      ) {
        return;
      }
      this.locked = true;
      const msgObj = {
        name: this.userData.userName,
        message: this.message
      };
      this.messages.push(msgObj);
      this.$socket.client.emit('send-chat-message', {
        room: this.roomName,
        message: this.message,
        uuid: this.userData.uuid
      });
      this.message = '';
    },
    onKeyPress(event) {
      if (event.key === 'Enter') {
        this.sendMsg();
      }
    }
  },
  sockets: {
    'chat-message'(msg) {
      this.messages.push(msg);
    },
    'user-connected'(name) {
      if (!this.showEnterLeaveMessage) {
        return;
      }
      const msg = {
        name,
        message: `${name} entered the room.`
      };
      this.messages.push(msg);
    },
    'user-disconnected'(name) {
      if (!this.showEnterLeaveMessage) {
        return;
      }
      const msg = {
        name,
        message: `${name} left the room.`
      };
      this.messages.push(msg);
    }
  }
};
</script>
