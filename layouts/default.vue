<template>
  <div class="app">
    <Header />
    <main class="main">
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vhCheck from 'vh-check';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default {
  components: {
    Header,
    Footer
  },
  async fetch() {
    const contentData = await this.$axios.$get(`${process.env.CMS_URL}/data`);
    const contentQueue = await this.$axios.$get(`${process.env.CMS_URL}/queue`);

    this.setContent({
      data: contentData,
      queue: contentQueue
    });
  },
  fetchOnServer: false,
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
