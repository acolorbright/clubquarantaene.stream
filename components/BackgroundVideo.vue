<template>
  <div class="fullscreen-bg">
    <video
      :loop="loop"
      muted
      autoplay
      playsinline
      class="fullscreen-bg__video"
      @play="onStarted"
      @ended="onEnded"
    >
      <source :src="src" type="video/mp4" />
    </video>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default:
        'https://player.vimeo.com/external/401375408.hd.mp4?s=bbf37b1601af62db2a1758fd0d63b6f23c5f2623&profile_id=175'
    },
    loop: {
      type: Boolean,
      default: true
    },
    onStarted: {
      type: Function,
      default: () => {}
    },
    onEnded: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
