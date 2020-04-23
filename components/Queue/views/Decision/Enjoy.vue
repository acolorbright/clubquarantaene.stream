<template>
  <div>
    <h3 class="step-title">
      Okay, enjoy and pick your color.
    </h3>

    <div class="step-color-dot" :style="dotStyle" />
    <slider-picker v-model="colors" class="step-color" @input="updateColor" />

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
    async registerUser() {
      const { rgba } = this.colors;
      const paddedColorValues = Object.keys(rgba).map(key => {
        const colorValue = rgba[key];
        return ('000' + colorValue).substr(-3, 3);
      });
      const rgbString = paddedColorValues.slice(0, -1).join(',');

      const colorPostData = JSON.stringify({
        rgbString,
        timestamp: Date.now()
      });
      const postConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const colorResponse = await this.$axios.$post(
        `${process.env.SOCKET_URL}/v1/registerUser`,
        colorPostData,
        postConfig
      );
      console.log(colorResponse);
    },
    updateColor(color) {
      this.registerUser();
      this.setColor(color.hex);
    },
    enterClub() {
      this.$emit('confirmDecision', true);
    }
  }
};
</script>
