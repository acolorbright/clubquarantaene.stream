<template>
  <div v-if="connected" class="interactive-buttons">
    <div
      v-for="(button, index) in buttons"
      :key="index"
      class="interactive-buttons-item"
    >
      <LiveInteraction :ref="button.reaction" :is-active="!button.isBlocked" />
      <button
        :disabled="button.isBlocked"
        @click="onSendReaction(button.reaction)"
      >
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
      overlayTextDuration: 12000, // in ms
      timeoutHandle: null,
      config: {
        liveStreamSlug: 'cq3-dev-livestream',
        apiRoot: 'https://api.offworld.live',
        clientAPIKey: 'rBCTty6nR7z8INqWAzVu9iJ1R3FtAm',
        reactionThrottleTime: 1000
      },
      reactionTextEnabled: false
    };
  },
  computed: {
    buttons() {
      return this.$store.state.interactivebuttons.buttons;
    }
  },
  beforeMount() {
    /* eslint-disable */
    this.api = new OffWorldLiveStream(this.config);

    this.api.connect().then(() => {
      // console.log('OffworldPerformance connected');
      this.connected = true;
    });

    this.api.onPercentCompleteChange((reactionName, percentComplete) => {
      if (!this.reactionTextEnabled) {
        this.reactionTextEnabled = true
      }
 
      this.setProgressBar({
        name: reactionName,
        percent: percentComplete
      });
    });

    this.api.onViewerCountChange((viewerCount)=> {
      // console.log('viewerCount', viewerCount);
    });
 
    // Sometimes, after a reaction is triggered there is a cooling-off
    // period when clicks to that reaction will have no effec
    this.api.onCoolDownChange((reactionName, isCoolingDown) => {
      // console.log('onCoolDownChange', isCoolingDown);

      if (isCoolingDown && this.reactionTextEnabled) {
        if (reactionName === 'dj') {
          this.setCurrentArtistName();
        } else {
          this.setLargeTextoverlay(reactionName);
        }

        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = setTimeout(() => {
          this.setLargeTextoverlay('');
        }, this.overlayTextDuration);
      }

      this.setButtonIsBlocked({
        key: reactionName,
        isBlocked: isCoolingDown
      });
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
      setLargeTextoverlay: 'setLargeTextoverlay',
      setCustomTextoverlay: 'setCustomTextoverlay',
      setButtonIsBlocked: 'setButtonIsBlocked'
    }),
    onSendReaction(name) {
      this.$refs[name][0].spawn();
      if (this.connected) {
        this.api.sendReaction(name);
      }
    },
    setCurrentArtistName() {
      const activeTimetableEntry = this.$store.state.content.timetable.find(
        entry => {
          const formattedStartTime = this.$moment(
            `${entry.startDay} ${entry.start}`
          );
          const formattedEndTime = this.$moment(`${entry.endDay} ${entry.end}`);
          return this.$moment().isBetween(formattedStartTime, formattedEndTime);
        }
      );

      if (activeTimetableEntry) {
        this.setCustomTextoverlay(
          `<img src="/assets/images/djs/${activeTimetableEntry.img}">`
        );
      } else {
        this.setCustomTextoverlay('');
      }
    }
  }
};
</script>
