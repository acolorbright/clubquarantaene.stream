<template>
  <div class="app">
    <Header v-if="!isQueue" />
    <main class="main">
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </main>
    <transition name="fade" mode="out-in">
      <LargeTextoverlay
        v-if="$store.state.interactivebuttons.largeTextoverlay"
      />
    </transition>
    <Footer v-if="!isQueue" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vhCheck from 'vh-check';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import LargeTextoverlay from '~/components/LargeTextoverlay';

export default {
  components: {
    Header,
    Footer,
    LargeTextoverlay
  },
  async fetch() {
    const contentData = await this.$axios.$get(`${process.env.CMS_URL}/data`);
    const contentQueue = await this.$axios.$get(`${process.env.CMS_URL}/queue`);

    this.setContent({
      data: contentData,
      queue: contentQueue,
      loaded: true,
      granted: true
    });
  },
  data() {
    return {
      eventStatusInterval: null
    };
  },
  computed: {
    isQueue() {
      return this.$nuxt.$route.path === '/';
    }
  },
  beforeMount() {
    this.initEventStatusInterval();
  },
  beforeDestroy() {
    clearInterval(this.eventStatusInterval);
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
      setContent: 'setContent',
      checkEventStatus: 'checkEventStatus'
    }),
    initEventStatusInterval() {
      this.eventStatusInterval = setInterval(() => {
        this.checkEventStatus();
      }, 1000);
    }
  },
  sockets: {
    'error-message'(error) {
      switch (error.type) {
        case 'sending-to-wrong-room':
          alert('you‘re not allowed to send to a room you‘re not logged in to');
          break;
        case 'cubicle-full':
          this.$router.push('/bathroom');
          break;
        default:
          alert(`Recieved error with unknown type: ${error.type}`);
          break;
      }
    }
  }
};
</script>
