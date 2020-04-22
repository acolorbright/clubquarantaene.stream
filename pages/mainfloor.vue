<template>
  <div class="page mainfloor">
    mainfloor
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gtag.pageview({
      page_path: '/mainfloor'
    });
  }
};
</script>
