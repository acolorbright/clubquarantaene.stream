<template>
  <div>
    <h3 class="step-title">
      Okay, enjoy and pick your color.
    </h3>

    <slider-picker v-model="colors" class="step-color" @input="updateColor" />
    <div class="step-color-dot" :style="dotStyle" />

    <div class="step-buttons-btn">
      <button class="step-buttons" @click="enterClub">Enter club</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Slider } from 'vue-color';

export default {
  components: {
    'slider-picker': Slider
  },
  data() {
    return {
      colors: {
        hex: '#0038FF'
      }
    };
  },
  computed: {
    dotStyle() {
      return {
        background: `radial-gradient(
          50% 50% at 50% 50%,
          ${this.colors.hex} 0%,
          transparent 18.23%,
          ${this.colors.hex} 29.69%,
          transparent 61.98%,
          transparent 66.15%,
          ${this.colors.hex} 79.69%,
          transparent 88.54%,
          ${this.colors.hex} 95.83%
        )`
      };
    }
  },
  methods: {
    ...mapActions({
      setColor: 'setColor'
    }),
    updateColor(color) {
      this.setColor(color.hex);
    },
    enterClub() {
      this.$emit('confirmDecision', true);
    }
  }
};
</script>
