<template>
  <div class="chat">
    <ChatHistory :messages="chatHistory" />
    <div class="chat-footer">
      <div class="chat-input">
        <span
          class="chat-history-indicator"
          :style="{ 'background-color': `${userColor}` }"
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
      default: 2000
    },
    maxLength: {
      type: Number,
      default: 300
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
    userColor() {
      return this.$store.state.guest.color;
    },
    chatHistory() {
      const messagesLength = this.messages.length;
      const lastMessagePos = this.messages.length - this.maxChatHistory;
      if (this.maxChatHistory && messagesLength >= this.maxChatHistory) {
        return this.messages.slice(lastMessagePos, messagesLength);
      } else {
        return this.messages;
      }
    }
  },
  beforeMount() {
    this.$socket.client.emit('new-user', this.roomName, this.userColor);
  },
  mounted() {
    document.addEventListener('keypress', this.onKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.onKeyPress);
    this.$socket.client.emit('user-leave', this.roomName);
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
        name: this.userColor,
        message: this.message
      };
      this.messages.push(msgObj);
      this.$socket.client.emit(
        'send-chat-message',
        this.roomName,
        this.message
      );
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
      const msg = {
        name,
        message: `${name} entered the room.`
      };
      this.messages.push(msg);
    },
    'user-disconnected'(name) {
      const msg = {
        name,
        message: `${name} left the room.`
      };
      this.messages.push(msg);
    }
  }
};
</script>
<style lang="scss">
.chat-history-indicator {
  width: 1em;
  height: 1em;
  border-radius: 100%;
  display: inline-block;
}
</style>
