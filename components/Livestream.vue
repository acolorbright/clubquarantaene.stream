<template>
  <div class="livestream">
    <div id="player" class="livestream-player" />
    <div class="livestream-controls">
      <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
      <button @click="resetCamera">reset camera</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      playerVars: {
        autoplay: 0,
        captions: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        fullscreen: 0,
        keyboard: 0,
        modestBranding: 1,
        origin: window.location.host,
        playsInline: 1,
        rel: 0,
        showinfo: 0
      },
      videoId: process.env.YOUTUBE_VIDEO_ID,
      cameraIsAnimating: false,
      cameraInitialTime: null
    };
  },
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      if (process.browser) {
        const YTPlayer = window.YT.Player;
        this.player = new YTPlayer('player', {
          events: {
            onReady: this.onReady,
            onStateChange: this.onStateChange,
            onPlaybackQualityChange: this.onPlaybackQualityChange,
            onError: this.onError
          },
          height: '180',
          playerVars: this.playerVars,
          videoId: this.videoId,
          width: '320'
        });
      }
    },
    playVideo() {
      console.log('playVideo');
      this.player.playVideo();
    },
    pauseVideo() {
      console.log('pauseVideo');
      this.player.pauseVideo();
    },
    onReady() {
      console.log('onReady');
    },
    onStateChange(playerState) {
      // -1 (UNSTARTED)
      // 0 (ENDED) YT.PlayerState.ENDED
      // 1 (PLAYING) YT.PlayerState.PLAYING
      // 2 (PAUSED) YT.PlayerState.PAUSED
      // 3 (BUFFERING) YT.PlayerState.BUFFERING
      // 5 (CUED) YT.PlayerState.CUED
      console.log('onStateChange', playerState.data);
      this.player.setVolume(0);
    },
    onPlaybackQualityChange() {},
    onError() {
      console.log('onError');
    },
    onBuffering() {
      console.log('onBuffering');
    },
    onPaused() {
      console.log('onPaused');
    },
    onPlaying() {
      console.log('onPlaying');
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
    }
  }
};
</script>
