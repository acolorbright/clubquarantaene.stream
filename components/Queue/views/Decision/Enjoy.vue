<template>
  <div>
    <h3 class="step-title">
      Okay, enjoy and pick your color.
    </h3>
    <div class="color-wrapper">
      <div class="step-color-dot" :style="dotStyle">
        <transition name="fade" mode="out-in">
          <div
            v-if="colorIsOccupied"
            class="step-color-error"
            :style="{
              color: colors.hex
            }"
          >
            This color is already taken. <br />
            Please pick another!
          </div>
        </transition>
      </div>
      <!-- <slider-picker v-model="colors" class="step-color" @input="updateColor" /> -->
      <chrome-picker v-model="colors" class="step-color" @input="updateColor" />
    </div>

    <div class="step-buttons-btn">
      <button
        class="step-buttons color-btn"
        :class="{
          disabled: !colorSelected
        }"
        @click="enterClub"
      >
        Enter
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Chrome } from 'vue-color';

export default {
  components: {
    // 'slider-picker': Slider,
    'chrome-picker': Chrome
  },
  data() {
    return {
      colorSelected: false,
      colors: {
        hex: '',
        rgba: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
          a: 1
        }
      },
      errors: [],
      colorIsOccupied: false
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
      setColor: 'setColor',
      setAccessGranted: 'setAccessGranted',
      setUserData: 'setUserData'
    }),
    getColorString() {
      const { rgba } = this.colors;
      const paddedColorValues = Object.keys(rgba).map(key => {
        const colorValue = rgba[key];
        const paddedValue = ('000' + colorValue).substr(-3, 3);
        return paddedValue;
      });
      return paddedColorValues.slice(0, -1).join(',');
    },
    async registerUser() {
      const rgbString = this.getColorString();
      const colorPostData = JSON.stringify({
        rgbString,
        timestamp: Date.now()
      });
      const postConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const registerResponse = await this.$axios.$post(
        `${process.env.SOCKET_URL}/v1/registerUser`,
        colorPostData,
        postConfig
      );
      return registerResponse;
    },
    updateColor(color) {
      if (this.colorIsOccupied) {
        this.colorIsOccupied = false;
      }
      if (!this.colorSelected) {
        this.colorSelected = true;
      }

      this.setColor(color.hex);
    },
    async enterClub() {
      try {
        const registerResponse = await this.registerUser();
        const { available } = registerResponse;

        this.setUserData(registerResponse);

        if (available) {
          this.setAccessGranted(true);
          this.$emit('confirmDecision', true);
        } else {
          this.colorIsOccupied = true;
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }
};
</script>
