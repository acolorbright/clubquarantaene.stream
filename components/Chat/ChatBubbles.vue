<template>
  <div class="chat-bubbles" v-if="colorArray">
    <div
      v-for="bubble in colorArray.colors"
      :key="bubble"
      class="chat-bubbles-item"
      :style="bubbleStyle(bubble)"
    />
  </div>
</template>
<script>
export default {
  name: 'ChatBubbles',
  props: ['colorArray'],
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    dotStyle(color) {
      const rgb = `rgb(${color})`;
      const rand01 = this.getRandomInt(0, 18);
      const rand02 = this.getRandomInt(18, 30);
      const rand03 = this.getRandomInt(30, 62);
      const rand04 = this.getRandomInt(62, 75);
      const rand05 = this.getRandomInt(75, 80);
      const rand06 = this.getRandomInt(80, 95);
      const rand07 = this.getRandomInt(95, 100);

      return `radial-gradient(
          50% 50% at 50% 50%,
          ${rgb} 0%,
          transparent ${rand01}%,
          ${rgb} ${rand02}%,
          transparent ${rand03}%,
          transparent ${rand04}%,
          ${rgb} ${rand05}%,
          transparent ${rand06}%,
          ${rgb} ${rand07}%
        )`;
    },
    bubbleStyle(color) {
      const x = document.body.offsetHeight;
      const y = document.body.offsetWidth;
      const randomX = Math.floor(Math.random() * x);
      const randomY = Math.floor(Math.random() * y);
      const style = {
        left: `${randomX}px`,
        top: `${randomY}px`,
        'background-color': `rgb(${color})`,
        background: this.dotStyle(color)
      };
      return style;
    }
  }
};
</script>
