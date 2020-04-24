<template>
  <div class="interactive-buttons">
    <div
      v-for="(button, index) in buttons"
      :key="index"
      class="interactive-buttons-item"
    >
      <LiveInteraction :ref="button.reaction" />
      <button @click="onSendReaction(button.reaction)">
        <span>{{ button.label }}</span>
        <span
          class="progress-bar"
          :style="{
            width: `${button.progress}%`
          }"
        />
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import LiveInteraction from './LiveInteraction.vue';

export default {
  name: 'InteractiveButtons',
  components: { LiveInteraction },
  data() {
    return {
      storeThrottle: 3, // % of reaction progress
      api: null,
      connected: false,
      config: {
        performanceName: 'clubquarantaene',
        apiRoot: 'https://performance.offworld.live',
        clientAPIKey: 'Zeb9JD6ZcNaDmZY2ILJzdIowforpm98Gu3hzUNpr'
      }
    };
  },
  computed: {
    buttons() {
      return this.$store.state.interactivebuttons.buttons;
    }
  },
  beforeMount() {
    /* eslint-disable */
    this.api = new OffworldPerformance(this.config);
    const vm = this;
    this.api.connect().then(() => {
      // console.log('OffworlPerformance connected');
      this.connected = true;
    });
    // this.api.onStateChange(newState => {
    //   switch (newState) {
    //     case OffworldPerformance.PerformanceWaitingForStart:
    //       console.log('Waiting for start');
    //       return;
    //     case OffworldPerformance.PerformanceInProgress:
    //       console.log('PerformanceInProgress');
    //       return;
    //     case OffworldPerformance.PerformanceEnded:
    //       console.log('PerformanceEnded');
    //       return;
    //     }
    // });
    this.api.onPercentCompleteChange((reactionName, percentComplete)=> {
      const oldVal =
        vm.buttons.find(button => button.reaction === reactionName).progress;
      // throtle the store commit a bit
      if (Math.abs(percentComplete - oldVal) > vm.storeThrottle) {
        vm.setProgressBar({
          name: reactionName,
          percent: percentComplete
        });
      }
      // if old val is smaller it must mean it has achieved 100% but only trigger something if there is no current textoverlay
      if (percentComplete < oldVal && !vm.$store.state.interactivebuttons.largeTextoverlay) {
        // console.log(`${reactionName} ACHIEVEMENT UNLOCKED`);
        vm.setLargeTextoverlay(reactionName);
        setTimeout(() => {
          vm.setLargeTextoverlay('');
        }, 8000);
      }
      // console.log(`onPercentCompleteChange: ${reactionName} is ${percentComplete}`);
    });
    /* eslint-enable */
  },
  beforeDestroy() {
    if (this.connected) {
      this.api.disconnect();
      // console.log('disconnected');
    }
  },
  methods: {
    ...mapActions({
      setProgressBar: 'setProgressBar',
      setLargeTextoverlay: 'setLargeTextoverlay'
    }),
    onSendReaction(name) {
      this.$refs[name][0].spawn();
      if (this.connected) {
        this.api.sendReaction(name);
      }
    }
  }
};
</script>
