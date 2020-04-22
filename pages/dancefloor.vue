<template>
  <div class="dancefloor">
    Dancefloor
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gtag.pageview({
      page_path: '/dancefloor'
    });
  }
};
</script>
