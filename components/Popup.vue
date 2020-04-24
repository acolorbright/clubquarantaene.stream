<template>
  <div class="popup" :class="classObj">
    <h3>{{ title }}</h3>
    <video v-if="video" playsinline autoplay muted loop>
      <source :src="video" type="video/mp4" />
    </video>
    <p>{{ text }}</p>
    <div v-if="buttons" class="popup-buttons">
      <button
        v-for="button in buttons"
        :key="button.label"
        @click="button.callback"
      >
        {{ button.label }}
      </button>
    </div>
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
    created: {
      type: Function
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
    buttons: {
      type: Array
    }
  },
  computed: {
    classObj() {
      if (
        this.position !== 'top' &&
        this.position !== 'right' &&
        this.position !== 'bottom' &&
        this.position !== 'left'
      ) {
        return 'popup-arrow-none';
      } else {
        return `popup-arrow-${this.position}`;
      }
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
    width: 30px;
    height: 30px;
    background: blue;
    border-radius: 0.25em;
    z-index: -1;
  }
  &-arrow-top::after {
    left: 50%;
    top: 0;
    transform: translate(-50%, -40%) rotate(45deg);
  }
  &-arrow-right::after {
    left: 100%;
    top: 50%;
    transform: translate(-50%, -40%) rotate(45deg);
  }
  &-arrow-bottom::after {
    left: 50%;
    top: 100%;
    transform: translate(-50%, -60%) rotate(45deg);
  }
  &-arrow-left::after {
    left: 0;
    top: 50%;
    transform: translate(-50%, -40%) rotate(45deg);
  }
  &-arrow-none::after {
    display: none;
  }
}
</style>
