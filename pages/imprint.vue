<template>
  <div class="page imprint">
    Imprint
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
