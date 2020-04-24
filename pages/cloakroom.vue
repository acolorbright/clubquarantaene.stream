<template>
  <div class="page page-cloakroom text-page">
    <div
      class="page-cloakroom-content"
      v-html="$store.state.content.cloakroom.text"
    />
    <BackgroundVideo :src="$store.state.content.cloakroom.backgroundVideo" />
  </div>
</template>

<script>
import BackgroundVideo from './../components/BackgroundVideo';

export default {
  components: {
    BackgroundVideo
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  mounted() {
    this.$gtag.pageview({ page_path: '/cloakroom' });
  }
};
</script>
