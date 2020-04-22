<template>
  <div class="page imprint">
    <h1>{{ $store.state.content.imprint.title }}</h1>
    <div class="imprint-content" v-html="$store.state.content.imprint.text" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gtag.pageview({
      page_path: '/imprint'
    });
  }
};
</script>
