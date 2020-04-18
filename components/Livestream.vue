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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // player parameters: https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5
      playerVars: {
        autoplay: 0,
        captions: 0,
        controls: 0,
        fullscreen: 0,
        keyboard: 0,
        modestBranding: 1,
        playsInline: 1,
        showinfo: 0
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
      this.player.setVolume(0);
    },
    onReady() {
      console.log('onReady');
    },
    async getPlaybackQuality() {
      const playerQuality = await this.player.getPlaybackQuality();
      console.log(playerQuality);
    },
    async getPlayerState() {
      // -1 – nicht gestartet
      // 0 – beendet
      // 1 – wird wiedergegeben
      // 2 – pausiert
      // 3 – wird gepuffert
      // 5 – Video positioniert
      const playerState = await this.player.getPlayerState();
      console.log(playerState);
    },
    panVideo() {
      const yaw = 0;
      const pitch = 0;

      this.player.setSphericalProperties({
        yaw,
        pitch
      });
    }
  }
};
</script>
