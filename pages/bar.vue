<template>
  <div class="page page-bar text-page">
    <h1>{{ $store.state.content.bar.title }}</h1>
    <div class="donations">
      <div
        v-for="(service, index) in $store.state.content.bar.services"
        :key="index"
        class="donations-item"
      >
        <h2 class="donations-item-headline">{{ service.title }}</h2>
        <div class="donations-item-text" v-html="service.text" />
        <div class="donations-item-links">
          <div
            v-for="(link, num) in service.links"
            :key="num"
            class="donations-item-link"
          >
            <a
              :href="link.link"
              target="_blank"
              class="button"
              @click="trackExternalLink(link.title)"
            >
              {{ link.linkText }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <BackgroundVideo :src="$store.state.content.bar.backgroundVideo" />
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
    this.$gtag.pageview({ page_path: '/bar' });
  },
  methods: {
    trackExternalLink(name) {
      this.$gtag.event(name, {
        event_category: 'external_link',
        event_label: 'linkclick'
      });
    }
  }
};
</script>
