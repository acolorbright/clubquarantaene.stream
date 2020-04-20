<template>
  <div class="text-page cloakroom-page">
    <h1>
      <a :href="$store.state.cloakroom.link" target="_blank">
        {{ $store.state.cloakroom.headline }}
      </a>
    </h1>
    <BackgroundVideo :src="$store.state.cloakroom.backgroundVideo" />
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
