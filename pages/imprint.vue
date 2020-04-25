<template>
  <div class="page page-imprint text-page force-select">
    <h1>{{ $store.state.content.imprint.title }}</h1>
    <div
      class="imprint-content force-select"
      v-html="$store.state.content.imprint.text"
    />
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
