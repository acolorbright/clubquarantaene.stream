<template>
  <div class="chat-bubbles" v-if="colorArray">
    <transition-group name="fade" mode="out-in">
      <div
        v-for="bubble in colorArray.colors"
        :key="bubble"
        class="chat-bubbles-item"
        :style="bubbleStyle(bubble)"
      />
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'ChatBubbles',
  props: ['colorArray'],
  data() {
    return {
      bufferZone: 0.15
    };
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    dotStyle(color) {
      const rgb = `rgb(${color})`;
      const rand01 = this.getRandomInt(0, 50);
      // const rand02 = this.getRandomInt(18, 80);
      const rand02 = this.getRandomInt(50, 80);
      // const rand03 = this.getRandomInt(30, 62);
      // const rand04 = this.getRandomInt(62, 75);
      // const rand05 = this.getRandomInt(75, 80);
      const rand06 = this.getRandomInt(80, 100);
      // const rand07 = this.getRandomInt(95, 100);
      return `radial-gradient(
          50% 50% at 50% 50%,
          transparent 0%,
          transparent ${rand01}%,
          ${rgb} ${rand02}%,
          transparent ${rand06}%
        )`;
    },
    bubbleStyle(color) {
      const minX = document.body.offsetWidth * this.bufferZone;
      const maxX = document.body.offsetWidth * (1 - this.bufferZone);
      const minY = document.body.offsetHeight * this.bufferZone;
      const maxY = document.body.offsetHeight * (1 - this.bufferZone);
      const randomX = this.getRandomInt(minX, maxX);
      const randomY = this.getRandomInt(minY, maxY);
      const scaleValue = this.getRandomInt(10, 15);

      const style = {
        background: this.dotStyle(color),
        transform: `translate(${parseInt(randomX)}px,
          ${parseInt(randomY)}px) translateZ(0) scale(${
          scaleValue * (scaleValue / 100)
        })`
      };
      return style;
    }
  }
};
</script>
