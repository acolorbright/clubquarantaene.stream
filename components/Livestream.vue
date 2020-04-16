<template>
  <div
    id="livestream"
    class="video-background"
    :class="{
      'insivible': $route.path != '/mainfloor'
    }"
  >
    <div class="video-foreground">
      <div id="player" />
    </div>
  </div>
</template>
<script>
const YTPlayer = require('yt-player')

export default {
  data () {
    return {
      player: null,
      isPlaying: false,
      options: {
        height: '315',
        width: '560',
        videoId: '5qXEI79LmTw',
        controls: 0,
        fullscreen: false,
        keyboard: false,
        modestBranding: true,
        captions: false,
        playsInline: true
      }
    }
  },
  mounted () {
    this.player = new YTPlayer('#player')
    this.player.load(this.options.videoId, this.options)
    this.player.play()
    const vm = this
    this.player.on('unstarted', () => {
      vm.player.play()
    })
    this.player.on('paused', () => {
      vm.player.play()
    })
    if (this.$route.name !== 'mainfloor') {
      this.player.setVolume(10)
    }
  },
  watch: {
    $route (to) {
      if (to.name === 'mainfloor') {
        this.player.play()
        this.player.setVolume(100)
      } else {
        this.player.play()
        this.player.setVolume(30)
      }
    }
  }
}
</script>
