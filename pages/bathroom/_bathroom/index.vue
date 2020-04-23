<template>
  <div class="bathroom">
    <transition name="fade" mode="out-in">
      <div v-if="showOverlay" class="respectful-overlay allcaps">
        Please be respectful!
      </div>
    </transition>
    <Chat :roomName="roomName" />
  </div>
</template>

<script>
import Chat from './../../../components/Chat';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: { Chat },
  data() {
    return {
      showOverlay: true
    };
  },
  computed: {
    roomName() {
      return `room${this.$route.params.bathroom}`;
    }
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
