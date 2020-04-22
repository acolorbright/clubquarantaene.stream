<template>
  <div class="page mainfloor">
    Mainfloor
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
