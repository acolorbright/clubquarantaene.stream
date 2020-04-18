<template>
  <div class="livestream">
    <div id="player" class="livestream-player" />
    <div class="livestream-controls">
      <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
      <button @click="panVideo">pan</button>
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
      videoId: process.env.YOUTUBE_VIDEO_ID
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
          height: '360',
          playerVars: this.playerVars,
          videoId: this.videoId,
          width: '640'
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
    onStateChange() {
      // -1 (UNSTARTED)
      // 0 (ENDED) YT.PlayerState.ENDED
      // 1 (PLAYING) YT.PlayerState.PLAYING
      // 2 (PAUSED) YT.PlayerState.PAUSED
      // 3 (BUFFERING) YT.PlayerState.BUFFERING
      // 5 (CUED) YT.PlayerState.CUED
      console.log('onStateChange');
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
    panVideo() {
      const rotationDuration = 20; // 20 seconds per rotation
      const yaw = ((performance.now() / 1000 / rotationDuration) * 360) % 360;

      const cyclesPerRotation = 2; // 2 up-down cycle per rotation
      const pitch =
        rotationDuration *
        Math.sin(((cyclesPerRotation * yaw) / 360) * 2 * Math.PI);

      this.player.setSphericalProperties({
        yaw,
        pitch
      });
    }
  }
};
</script>
