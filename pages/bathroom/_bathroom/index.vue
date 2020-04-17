<template>
  <div class="bathroom">
    <transition name="fade" mode="out-in">
      <div v-if="showOverlay" class="respectful-overlay allcaps">
        Please be respectful!
      </div>
    </transition>
    <Chat />
  </div>
</template>

<script>
import Chat from './Chat/index.vue';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: { Chat },
  data() {
    return {
      room: null,
      showOverlay: true
    };
  },
  beforeMount() {
    // if (!this.$store.state.oldState.questions.firstQuestionAnswered && this.$store.state.oldState.lockRooms) {
    //   this.$router.push({ path: '/line' })
    // }
  },
  mounted() {
    window.addEventListener('beforeunload', this.disconnect);
    const vm = this;
    vm.room = vm.$route.params.bathroom - 1;
    vm.$socket.client.emit('room-connect', vm.room);
    setTimeout(function () {
      vm.showOverlay = false;
    }, 2000);
    vm.$gtag.pageview({ page_path: `/bathroom/${vm.$route.params.bathroom}` });
  },
  beforeDestroy() {
    this.disconnect();
  },
  methods: {
    disconnect() {
      this.$socket.client.emit('room-disconnect', this.room);
    }
  }
};
</script>
