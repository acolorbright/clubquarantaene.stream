<template>
  <transition name="fade" mode="out-in">
    <div
      v-show="isDancefloor || isTimetable"
      class="livestream"
      :class="{
        disabled: isTimetable
      }"
    >
      <div id="player" class="livestream-player" />

      <transition name="fade" mode="out-in">
        <div v-if="isDev" class="livestream-controls">
          <button
            v-if="panningEnabled"
            class="livestream-controls-btn"
            @click="handleVideoPanning"
          >
            {{ panningEnabled ? 'Disable panning' : 'Enable panning' }}
          </button>
          <button class="livestream-controls-btn" @click="handleMuted">
            {{ muted ? 'mute' : 'unmute' }}
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
      panningEnabled: false,
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
    isDev() {
      return process.env.isDev;
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
      if (this.isDev) {
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
          this.loadVideo(process.env.YOUTUBE_VIDEO_ID_ENDED);
        }, 1000);
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
      process.env.isDev ? this.muteVideo() : this.setVolumeMax();
      const currentId = this.eventHasEnded
        ? process.env.YOUTUBE_VIDEO_ID_ENDED
        : process.env.YOUTUBE_VIDEO_ID;

      this.loadVideo(currentId);
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
    resetCamera() {
      this.animatedCameraPan(0, 0);
    },
    animatedCameraPan(targetYaw, targetPitch) {
      const springConstant = -0.8;

      const panCamera = () => {
        const currentSphericalProperties = this.player.getSphericalProperties();
        const { yaw, pitch } = currentSphericalProperties;
        const currentTime = performance.now();

        if (!this.cameraInitialTime) {
          if (yaw !== null) {
            this.cameraInitialTime = currentTime;
            this.cameraIsAnimating = true;
          }
        }

        if (this.cameraIsAnimating) {
          let yawDiff = targetYaw - yaw;
          if (yawDiff > 180) {
            yawDiff -= 360;
          } else if (yawDiff < -180) {
            yawDiff += 360;
          }
          const pitchDiff = targetPitch - pitch;

          if (Math.max(Math.abs(yawDiff), Math.abs(pitchDiff)) < 1) {
            this.cameraIsAnimating = false;
          }

          const deltaTime = (currentTime - this.cameraInitialTime) / 1000;

          let newYaw =
            targetYaw - yawDiff * Math.exp(springConstant * deltaTime);
          newYaw = ((newYaw % 360) + 360) % 360;

          const newPitch =
            targetPitch - pitchDiff * Math.exp(springConstant * deltaTime);

          this.player.setSphericalProperties({
            yaw: newYaw,
            pitch: newPitch,
            enableOrientationSensor: false
          });
        }

        if (this.cameraIsAnimating) {
          requestAnimationFrame(panCamera);
        } else {
          this.cameraInitialTime = null;
        }
      };

      panCamera();
    },
    handleVideoPanning() {
      this.panningEnabled = !this.panningEnabled;
      this.panVideo();
    },
    handleMuted() {
      if (!this.isDev) {
        return;
      }

      this.muted = !this.muted;

      if (this.muted) {
        this.setVolumeMax();
      } else {
        this.muteVideo();
      }
    },
    panVideo() {
      const pan = () => {
        const rotationDuration = 60;
        const cyclesPerRotation = 0;

        const yaw = ((performance.now() / 1000 / rotationDuration) * 360) % 360;
        const pitch =
          rotationDuration *
          Math.sin(((cyclesPerRotation * yaw) / 360) * 2 * Math.PI);

        this.player.setSphericalProperties({
          yaw,
          pitch
        });

        if (this.panningEnabled) {
          requestAnimationFrame(this.panVideo);
        }
      };

      pan();
    }
  }
};
</script>
