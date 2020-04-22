<template>
  <div class="chat">
    <ChatHistory :messages="messages" />
    <div class="chat-footer">
      <div class="chat-input">
        <span
          class="chat-history-indicator"
          :style="{ 'background-color': `rgb(${userColor})` }"
        />
        <input v-model="message" type="text" placeholder="Write a message..." />
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
  data() {
    return {
      message: '',
      throttleTimer: 2000,
      locked: false,
      messages: [],
      userColor: '255,255,0'
    };
  },
  mounted() {
    document.addEventListener('keypress', this.onKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.onKeyPress);
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
      this.message = '';
    },
    onKeyPress(event) {
      if (event.key === 'Enter') {
        this.sendMsg(false);
      }
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
