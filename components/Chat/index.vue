<template>
  <div
    class="chat"
    :class="{
      'chat-gradient': maxChatHistory && messages.length >= maxChatHistory - 5
    }"
  >
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
        const slicedMsg = this.messages.slice(lastMessagePos, messagesLength);
        return slicedMsg;
      } else {
        return this.messages;
      }
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
    this.$socket.client.emit('new-user', this.roomName, this.userColor);
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
<style lang="scss">
.chat-history-indicator {
  width: 1em;
  height: 1em;
  border-radius: 100%;
  display: inline-block;
}
$gradientSteps: 8;
.chat-gradient .chat-history-message {
  transition: opacity 200ms ease;
  // loop to creade the gradient
  @for $i from 1 through $gradientSteps {
    &:nth-child(#{$i}) {
      opacity: #{0 + $i * 1 / $gradientSteps};
    }
  }
}
</style>
