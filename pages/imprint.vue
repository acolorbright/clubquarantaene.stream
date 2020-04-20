<template>
  <div class="text-page imprint">
    <h1>{{ $store.state.imprint.title }}</h1>
    <div class="imprint-content" v-html="$store.state.imprint.text" />
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
};
</script>
