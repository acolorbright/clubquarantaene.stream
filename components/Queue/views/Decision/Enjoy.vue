<template>
  <div>
    <transition name="fade-step" mode="out-in">
      <div v-if="!showEntryAnimation">
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
                  color: colors.rgba
                }"
              >
                This color is already taken!
              </div>
            </transition>
          </div>
          <chrome-picker
            v-model="colors"
            class="step-color"
            @input="updateColor"
          />
        </div>

        <div class="step-buttons-btn">
          <button class="step-buttons color-btn" @click="enterClub">
            Enter Club
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade" mode="out-in">
      <BackgroundVideo
        v-if="showEntryAnimation"
        :class="{
          hidden: !entryAnimationStarted
        }"
        :src="$store.state.queue.entryVideo"
        :loop="false"
        :on-started="handleOnStarted"
        :on-ended="handleOnEnded"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Chrome } from 'vue-color';
import BackgroundVideo from '~/components/BackgroundVideo';

export default {
  components: {
    'chrome-picker': Chrome,
    BackgroundVideo
  },
  data() {
    return {
      colorSelected: false,
      colors: {
        rgba: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
          a: 1
        }
      },
      errors: [],
      colorIsOccupied: false,
      showEntryAnimation: false,
      entryAnimationStarted: false
    };
  },
  computed: {
    dotStyle() {
      const { r, g, b, a } = this.colors.rgba;
      const rgba = `rgba(${r},${g},${b},${a})`;

      return {
        background: `radial-gradient(
          50% 50% at 50% 50%,
          ${rgba} 0%,
          transparent 18.23%,
          ${rgba} 29.69%,
          transparent 61.98%,
          transparent 66.15%,
          ${rgba} 79.69%,
          transparent 88.54%,
          ${rgba} 95.83%
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
        `${process.env.socketUrl}/v1/registerUser`,
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

      this.setColor(color.rgba);
    },
    startEntryAnimation() {
      this.showEntryAnimation = true;
    },
    handleOnStarted() {
      console.log('handleOnStarted');
      this.entryAnimationStarted = true;
    },
    handleOnEnded() {
      console.log('handleOnEnded');
      this.$emit('confirmDecision', true);
    },
    async enterClub() {
      if (process.env.isDebugMode) {
        this.startEntryAnimation();
        return;
      }

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
