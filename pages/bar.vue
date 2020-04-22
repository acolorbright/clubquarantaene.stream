<template>
  <div class="page bar">
    Bar
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gtag.pageview({
      page_path: '/bar'
    });
  }
};
</script>
