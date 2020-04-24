<template>
  <div class="page page-dancefloor"></div>
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
