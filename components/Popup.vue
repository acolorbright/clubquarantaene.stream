<template>
  <div class="popup" :class="classObj">
    <h3>{{ title }}</h3>
    <video v-if="video" playsinline autoplay muted loop>
      <source :src="video" type="video/mp4" />
    </video>
    <p>{{ text }}</p>
    <button v-if="buttonLabel" @click="onPopupClick">{{ buttonLabel }}</button>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  props: {
    position: {
      type: String,
      default: 'top'
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    video: {
      type: String
    },
    buttonLabel: {
      type: String
    }
  },
  computed: {
    classObj() {
      return this.position !== 'bottom'
        ? 'popup-arrow-top'
        : 'popup-arrow-bottom';
    }
  },
  methods: {
    onPopupClick() {
      console.log('onPopupClick');
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: blue;
  color: white;
  z-index: 101;
  padding: 1em;
  video {
    width: 100%;
    height: auto;
  }
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    width: 30px;
    height: 30px;
    background: blue;
    transform: translate(-50%, -40%) rotate(45deg);
    border-radius: 0.25em;
    z-index: -1;
  }
}
</style>
