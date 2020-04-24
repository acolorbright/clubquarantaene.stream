<template>
  <div class="livestream">
    <div id="player" class="livestream-player" />
    <transition name="fade" mode="out-in">
      <div v-if="videoIsPlaying" class="livestream-controls">
        <button class="livestream-controls-btn" @click="handleVideoPanning">
          {{ panningEnabled ? 'Disable panning' : 'Enable panning' }}
        </button>
      </div>
    </transition>
  </div>
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
        playsInline: 1,
        rel: 0,
        showinfo: 0
      },
      videoId: process.env.YOUTUBE_VIDEO_ID,
      videoIsPlaying: false,
      cameraIsAnimating: false,
      cameraInitialTime: null,
      panningEnabled: false
    };
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
      console.log('ready');
    },
    onStateChange({ data }) {
      console.log(data);
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

      this.player.setVolume(0);
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
    panVideo() {
      const pan = () => {
        const rotationDuration = 20;
        const cyclesPerRotation = 2;

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
