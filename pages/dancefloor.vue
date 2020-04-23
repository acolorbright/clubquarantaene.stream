<template>
  <div class="page page-dancefloor">
    <Livestream />
  </div>
</template>

<script>
import Livestream from '~/components/Livestream.vue';

export default {
  components: {
    Livestream
  },
  mounted() {
    this.$gtag.pageview({
      page_path: '/dancefloor'
    });
  }
};
</script>
