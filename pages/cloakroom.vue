<template>
  <div class="page page-cloakroom">
    <h1>{{ $store.state.content.cloakroom.title }}</h1>
    <div v-html="$store.state.content.cloakroom.text" />
    <BackgroundVideo :src="$store.state.content.cloakroom.text" />
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
