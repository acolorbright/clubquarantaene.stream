<template>
  <div class="large-textoverlay">
    <span>{{ $store.state.interactivebuttons.largeTextoverlay }}</span>
  </div>
</template>
<script>
export default {
  name: 'LargeTextoverlay'
};
</script>
<style lang="scss">
.large-textoverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 97vh; //optical centering
  z-index: 999;
  display: flex;
  pointer-events: none;
  align-content: center;
  text-align: center;
  justify-content: center;
  font-size: 10vw;
  line-height: 1;
  color: white;
  flex-direction: column;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 0.25em;
}
</style>
