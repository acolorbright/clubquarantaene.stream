<template>
  <transition name="fade" mode="out-in">
    <div
      v-show="isDancefloor || isTimetable"
      class="livestream"
      :class="{
        disabled: isTimetable,
        isPlaying: videoIsPlaying
      }"
    >
      <div id="player" class="livestream-player" />

      <transition name="fade" mode="out-in">
        <div v-if="isDebugMode" class="livestream-controls">
          <button class="livestream-controls-btn" @click="handleMuted">
            {{ muted ? 'mute' : 'unmute' }}
            {{ eventHasEnded }}
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      playerVars: {
        autoplay: 1,
        captions: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        fullscreen: 0,
        iv_load_policy: 3,
        keyboard: 0,
        modestBranding: 1,
        origin: window.location.host,
        playsinline: 1,
        rel: 0,
        showinfo: 0
      },
      videoId: '',
      videoIsPlaying: false,
      cameraIsAnimating: false,
      cameraInitialTime: null,
      muted: false
    };
  },
  computed: {
    isDancefloor() {
      return this.$nuxt.$route.name === 'dancefloor';
    },
    isTimetable() {
      return this.$nuxt.$route.name === 'timetable';
    },
    isDebugMode() {
      return process.env.isDebugMode;
    },
    eventIsRunning() {
      return this.$store.state.event.isRunning;
    },
    eventHasEnded() {
      return this.$store.state.event.hasEnded;
    }
  },
  watch: {
    '$nuxt.$route.name'(routeName) {
      if (this.isDebugMode) {
        return;
      }

      if (this.isDancefloor) {
        this.setVolumeMax();
      } else {
        this.setVolumeReduced();
      }
    },
    eventHasEnded(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        setTimeout(() => {
          this.loadVideo(process.env.youtubeVideoIdEnded);
        }, 1500);
      }
    }
  },
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      const YTPlayer = window.YT.Player;
      this.player = new YTPlayer('player', {
        events: {
          onReady: this.onReady,
          onStateChange: this.onStateChange,
          onPlaybackQualityChange: this.onPlaybackQualityChange,
          onError: this.onError
        },
        playerVars: this.playerVars,
        videoId: this.videoId
        // height: '360',
        // width: '640'
      });
    },
    playVideo() {
      this.player.playVideo();
    },
    onReady() {
      process.env.isDebugMode ? this.muteVideo() : this.setVolumeMax();
      const currentId = this.eventHasEnded
        ? process.env.youtubeVideoIdEnded
        : process.env.youtubeVideoId;

      this.loadVideo(
        this.isDebugMode ? process.env.youtubeVideoIdDev : currentId
      );
    },
    muteVideo() {
      this.player.setVolume(0);
    },
    setVolumeMax() {
      this.player.setVolume(100);
    },
    setVolumeReduced() {
      this.player.setVolume(35);
    },
    loadVideo(videoId) {
      this.player.loadVideoById(videoId);
    },
    onStateChange({ data }) {
      /**
       * unstarted: -1
       * ended: 0
       * playing: 1
       * paused: 2
       * buffering: 3
       * cued: 5
       */
      switch (data) {
        case 1:
          this.videoIsPlaying = true;
          break;
        case 2:
          this.videoIsPlaying = false;
          this.playVideo();
          break;
        default:
          this.playVideo();
          break;
      }
    },
    onPlaybackQualityChange(quality) {
      // console.log('onPlaybackQualityChange', quality);
    },
    handleMuted() {
      if (!this.isDebugMode) {
        return;
      }

      this.muted = !this.muted;

      if (this.muted) {
        this.setVolumeMax();
      } else {
        this.muteVideo();
      }
    }
  }
};
</script>
