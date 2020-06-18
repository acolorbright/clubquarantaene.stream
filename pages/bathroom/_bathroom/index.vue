<template>
  <div class="bathroom">
    <Chat
      class="light-theme"
      :room-name="roomName"
      :show-enter-leave-message="true"
    />
    <ChatBubbles :color-array="colorArray" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Chat from './../../../components/Chat';
import ChatBubbles from './../../../components/Chat/ChatBubbles';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: { Chat, ChatBubbles },
  data() {
    return {
      colorArray: null
    };
  },
  computed: {
    roomName() {
      return `room${this.$route.params.bathroom}`;
    }
  },
  methods: {
    ...mapActions({
      setLargeTextoverlay: 'setLargeTextoverlay'
    })
  },
  mounted() {
    // Show large overlay and remove after 2s
    this.setLargeTextoverlay('Please be respectful');
    setTimeout(() => {
      this.setLargeTextoverlay('');
    }, 2000);
    this.$gtag.pageview({
      page_path: `/bathroom/${this.$route.params.bathroom}`
    });
  },
  sockets: {
    cubicleColors(colorArray) {
      this.colorArray = colorArray;
    }
  }
};
</script>
