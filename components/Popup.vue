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
