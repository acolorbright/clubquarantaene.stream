<template>
  <div>
    <h3 class="step-title">
      Okay, enjoy and pick your color.
    </h3>

    <slider-picker v-model="colors" class="step-color" />

    <div class="step-buttons-btn">
      <button class="step-buttons" @click="enterClub">Enter club</button>
    </div>
  </div>
</template>

<script>
import { Slider } from 'vue-color';

export default {
  components: {
    'slider-picker': Slider
  },
  data() {
    return {
      colors: {
        hex: '#194d33',
        hsl: {
          h: 150,
          s: 0.5,
          l: 0.2,
          a: 1
        },
        hsv: {
          h: 150,
          s: 0.66,
          v: 0.3,
          a: 1
        },
        rgba: {
          r: 25,
          g: 77,
          b: 51,
          a: 1
        },
        a: 1
      }
    };
  },
  methods: {
    enterClub() {
      alert('enter club');
    }
  }
};
</script>
