<template>
  <div class="interactive-buttons">
    <div
      class="interactive-buttons-item"
      v-for="(button, index) in $store.state.interactivebuttons.buttons"
      :key="index"
    >
      <LiveInteraction :ref="button.reaction" />
      <button @click="onSendReaction(button.reaction)">
        <span>{{ button.label }}</span>
        <span
          class="progress-bar"
          :style="{
            width: `${(button.currentClicks / button.maxClickAmount) * 100}%`
          }"
        />
      </button>
    </div>
  </div>
</template>
<script>
import LiveInteraction from './LiveInteraction.vue';

export default {
  name: 'OffworldButtons',
  components: { LiveInteraction },
  beforeDestroy() {
    if (this.connected) {
      this.api.disconnect();
      console.log(this.api);
    }
  },
  methods: {
    onSendReaction(name) {
      this.$refs[name][0].spawn();
      console.log(`onSendReaction: ${name}`);
    }
  }
};
</script>
