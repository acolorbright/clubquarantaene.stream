<template>
  <div class="app">
    <Header v-if="!isQueue" />
    <main class="main">
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </main>
    <Footer v-if="!isQueue" />
    <Popup
      title="Headline"
      text="I am a popup"
      buttonLabel="Ok, got it"
      video="https://player.vimeo.com/external/401375408.hd.mp4?s=bbf37b1601af62db2a1758fd0d63b6f23c5f2623&profile_id=175"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vhCheck from 'vh-check';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Popup from '~/components/Popup';

export default {
  components: {
    Header,
    Footer,
    Popup
  },
  async fetch() {
    const contentData = await this.$axios.$get(`${process.env.CMS_URL}/data`);
    const contentQueue = await this.$axios.$get(`${process.env.CMS_URL}/queue`);

    this.setContent({
      data: contentData,
      loaded: true,
      queue: contentQueue,
      granted: true
    });
  },
  fetchOnServer: false,
  computed: {
    isQueue() {
      return this.$nuxt.$route.path === '/';
    }
  },
  mounted() {
    vhCheck({
      cssVarName: 'vh-offset'
    });

    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 750);
    });
  },
  methods: {
    ...mapActions({
      setContent: 'setContent'
    })
  }
};
</script>
