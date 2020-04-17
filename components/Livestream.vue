<template>
  <div
    id="livestream"
    class="video-background"
    :class="{
      insivible: $route.path != '/mainfloor'
    }"
  >
    <div class="video-foreground">
      <youtube
        id="player"
        ref="youtube"
        :height="315"
        :width="560"
        :player-vars="playerVars"
        :video-id="videoId"
        @buffering="onBuffering"
        @cued="onCued"
        @ended="onEnded"
        @error="onError"
        @paused="onPaused"
        @playing="onPlaying"
        @ready="onReady"
      />
      <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerVars: {
        autoplay: false,
        captions: false,
        controls: false,
        fullscreen: false,
        keyboard: false,
        modestBranding: true,
        playsInline: true
      },
      videoId: process.env.YOUTUBE_VIDEO_ID
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    onBuffering() {
      console.log('onBuffering');
    },
    onCued() {
      console.log('onCued');
    },
    onEnded() {
      console.log('onEnded');
    },
    onError() {
      console.log('onError');
    },
    onPaused() {
      console.log('onPaused');
    },
    onPlaying() {
      console.log('onPlaying');
    },
    onReady() {
      console.log('onReady');
    }
  }
};
</script>
