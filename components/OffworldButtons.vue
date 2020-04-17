<template>
  <div class="offworld-buttons">
    <transition name="fade">
      <div v-if="showOverlay" class="overlay-info" @click="showOverlay = false">
        <div class="overlay-text">
          Press us for<br />
          ↙ interactivity on the stream ↘
        </div>
      </div>
    </transition>
    <FakeLiveInteraction ref="fakeLiveInteraction" />
    <div class="offworld-buttons-wrapper">
      <div class="offworld-button">
        <img
          class="offworld-button-image"
          src="/assets/images/grid.png"
          @click="sendReaction('grid')"
        />
      </div>
      <div class="offworld-button">
        <img
          class="offworld-button-image"
          src="/assets/images/horizontal.png"
          @click="sendReaction('horizontal')"
        />
      </div>
      <div class="offworld-button">
        <img
          class="offworld-button-image"
          src="/assets/images/vertical.png"
          @click="sendReaction('vertical')"
        />
      </div>
      <div class="offworld-button breaker" />
      <div class="offworld-button offworld-button-text">
        <span @click="sendReaction('GoToKlinikum')">GoToKlinikum</span>
      </div>
      <div class="offworld-button offworld-button-text">
        <span @click="sendReaction('GoToExhibit')">GoToExhibit</span>
      </div>
    </div>
  </div>
</template>
<script>
import FakeLiveInteraction from './FakeLiveInteraction.vue';

export default {
  name: 'OffworldButtons',
  components: { FakeLiveInteraction },
  data() {
    return {
      api: null,
      showOverlay: false,
      connected: false,
      gridCurrentClicks: 0,
      clickThrottle: null,
      apiKey: 'Zeb9JD6ZcNaDmZY2ILJzdIowforpm98Gu3hzUNpr',
      performanceName: 'clubquarantaene'
    };
  },
  mounted() {
    const vm = this;
    /* eslint-disable */
    this.api = new OffworldPerformance({
      performanceName: this.performanceName,
      clientAPIKey: this.apiKey
      // reactionThrottleTime: 1000
    })
    // create a callback for when
    // the performance state changes
    this.api.onStateChange((newState) => {
      switch (newState) {
        case OffworldPerformance.PerformanceWaitingForStart:
          // waiting for start
          document.body.setAttribute('class', 'waiting-to-start')
          return

        case OffworldPerformance.PerformanceInProgress:
          // waiting for start
          document.body.setAttribute('class', 'in-progress')
          return
        case OffworldPerformance.PerformanceEnded:
          // waiting for start
          document.body.setAttribute('class', 'ended')
      }
    })
    this.api
      .connect()
      .then(() => {
        vm.connected = true
      })
    /* eslint-enable */
    if (vm.$store.state.showButtonOverlay) {
      setTimeout(() => {
        vm.showOverlay = true;
      }, 2000);
      setTimeout(() => {
        vm.showOverlay = false;
        vm.$store.commit('setShowButtonOverlay');
      }, 10000);
    }
  },
  beforeDestroy() {
    if (this.connected) {
      this.api.disconnect();
      console.log(this.api);
    }
  },
  methods: {
    sendReaction(name) {
      this.$refs.fakeLiveInteraction.spawnPlusOne();
      if (!this.connected) {
        return;
      }
      this.api.sendReaction(name);
    }
  }
};
</script>
