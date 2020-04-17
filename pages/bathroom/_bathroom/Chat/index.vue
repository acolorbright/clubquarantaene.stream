<template>
  <div class="chatroom">
    <div ref="chatroomMessages" class="chatroom--messages">
      <ul ref="chatHistory">
        <li
          v-for="(message, index) in chatHistory"
          :key="index"
          :class="{
            'own-message': message.ownMessage,
            'good-bye-message': message.goodByeMessage
          }"
        >
          <span>
            {{ message.message }}
          </span>
          <div v-if="!message.goodByeMessage" class="sender">
            Cubicle {{ message.bathroomNo }}
          </div>
        </li>
      </ul>
    </div>
    <div class="chatroom--footer">
      <div class="input-area message-look">
        <input v-model="message" type="text" placeholder="Write a message..." />
        <input
          type="submit"
          value="Send"
          :disabled="locked"
          @click="sendMsg(false)"
        />
      </div>
      <div class="chatroom--footer-emojis" :class="{ inactive: emojisClicked }">
        <span @click="handleEmojiClick('horse')">🥑</span>
        <span @click="handleEmojiClick('snowflake')">💵</span>
        <span @click="handleEmojiClick('lightning')">🦠</span>
      </div>
    </div>
  </div>
</template>
<script>
const Filter = require('bad-words');

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      locked: false,
      chatHistory: [],
      timeout: null,
      emojiTimeout: null,
      emojisClicked: false,
      bathroomNo: null,
      filter: null,
      additionalBadWords: [
        'ketamine',
        'coke',
        'cocaine',
        'kokain',
        'koks',
        'speed',
        'drugs',
        'drug',
        'joint',
        'spliff'
      ]
    };
  },
  watch: {
    chatHistory: {
      deep: true,
      handler() {
        const vm = this;
        setTimeout(() => {
          vm.$refs.chatroomMessages.scrollTop =
            vm.$refs.chatroomMessages.scrollHeight;
        }, 100);
      }
    }
  },
  // beforeMount () {
  //   if (!this.$store.state.oldState.questions.firstQuestionAnswered && this.$store.state.oldState.lockRooms) {
  //     this.$router.push({ path: '/line' })
  //   }
  // },
  mounted() {
    document.addEventListener('keypress', this.handleEnter);
    const vm = this;
    vm.bathroomNo = vm.$route.params.bathroom;
    vm.filter = new Filter();
    // vm.filter.addWords(vm.additionalBadWords)
    this.timeout = setTimeout(() => {
      vm.kickMeOut();
    }, 300000); // 5min
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.handleEnter);
    clearTimeout(this.timeout);
    // this.sendMsg(true)
  },
  methods: {
    kickMeOut() {
      // console.log('kcik me out')
      this.$router.push({ path: '/bathroom' });
    },
    resetEmojis() {
      this.$store.commit('resetEmojis');
      this.emojisClicked = false;
      this.emojiTimeout = null;
    },
    handleEmojiClick(emoji) {
      const vm = this;
      vm.emojisClicked = true;
      switch (emoji) {
        case 'horse':
          vm.$store.commit('setHorse');
          break;
        case 'snowflake':
          vm.$store.commit('setSnowflake');
          break;
        default:
          vm.$store.commit('setLightning');
      }
      vm.emojiTimeout = setTimeout(() => {
        vm.resetEmojis();
      }, 40500);
      // this.$gtag.event(emoji, {
      //   event_category: 'emoji_click',
      //   event_label: 'linkclick'
      // })
      vm.$router.push({ path: '/mainfloor' });
    },
    sendMsg(isGoodByeMessage) {
      // dont to anything when the message is empty
      if (
        (this.message === null ||
          this.message.match(/^ *$/) !== null ||
          this.locked) &&
        !isGoodByeMessage
      ) {
        return;
      }
      const vm = this;
      // if it is a goodbyemessage
      const messageString = !isGoodByeMessage
        ? vm.filter.clean(vm.message)
        : `Cubicle ${vm.bathroomNo} left`;
      // const messageString = !isGoodByeMessage ? vm.message : `Cubicle ${vm.bathroomNo} left`

      vm.locked = true;
      const msgObj = {
        message: messageString,
        ownMessage: true,
        goodByeMessage: isGoodByeMessage,
        bathroomNo: vm.bathroomNo
      };
      vm.chatHistory.push(msgObj);
      vm.$socket.client.emit('sendMessage', {
        message: messageString,
        ownMessage: false,
        goodByeMessage: isGoodByeMessage,
        bathroomNo: vm.bathroomNo
      });
      vm.message = '';
      setTimeout(() => {
        vm.locked = false;
      }, 1000);
      // this.$gtag.event('sent_chat_message', {
      //   event_category: 'chat',
      //   event_label: 'chat'
      // })
    },
    handleEnter(event) {
      if (event.key === 'Enter') {
        this.sendMsg(false);
      }
    }
  },
  sockets: {
    newMessage(msg) {
      this.chatHistory.push(msg);
    }
  }
};
</script>
