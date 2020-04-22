<template>
  <div class="text-page imprint">
    <h1>{{ $store.state.content.imprint.title }}</h1>
    <div class="imprint-content" v-html="$store.state.content.imprint.text" />
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
