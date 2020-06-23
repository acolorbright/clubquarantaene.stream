<template>
  <div>
    <div ref="liveInteraction" class="live-interaction" />
  </div>
</template>
<script>
export default {
  name: 'FakeLiveInteraction',
  props: {
    isActive: Boolean
  },
  data() {
    return {
      interaction: null,
      lifespan: 500
    };
  },
  computed: {
    max() {
      return 850000 / parseInt(this.$store.state.event.userCount);
    },
    min() {
      return 200000 / parseInt(this.$store.state.event.userCount);
    }
  },
  mounted() {
    this.startLoop();
  },
  methods: {
    spawn() {
      const newDiv = document.createElement('div');
      newDiv.className = `plus-one item-${
        Math.round(Math.random() * (5 - 1)) + 1
      }`;
      const newContent = document.createTextNode('+1');
      newDiv.appendChild(newContent);
      this.$refs.liveInteraction.appendChild(newDiv);
      setTimeout(function () {
        newDiv.parentNode.removeChild(newDiv);
      }, this.lifespan);
    },
    startLoop() {
      const rand = Math.round(Math.random() * (this.max - this.min)) + this.min;
      setTimeout(() => {
        if (this.isActive) {
          this.spawn();
        }

        this.startLoop();
      }, rand);
    }
  }
};
</script>
