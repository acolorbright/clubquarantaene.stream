<template>
  <div class="page cloakroom">
    Cloakroom
  </div>
</template>

<script>
export default {
  mounted() {
    this.$gtag.pageview({
      page_path: '/cloakroom'
    });
  }
};
</script>
