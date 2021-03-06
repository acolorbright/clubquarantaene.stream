<template>
  <div class="app">
    <Header v-if="(!isQueue && eventIsRunning) || isDebugMode" />
    <main class="main">
      <transition name="fade" mode="out-in">
        <Livestream v-if="!isQueue" />
      </transition>
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </main>
    <transition name="fade" mode="out-in">
      <LargeTextoverlay
        v-if="
          $store.state.interactivebuttons.largeTextoverlay &&
          this.$nuxt.$route.name === 'dancefloor'
        "
      />
    </transition>
    <Footer v-if="!isQueue || $store.state.event.hasEnded" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vhCheck from 'vh-check';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Livestream from '~/components/Livestream.vue';
import LargeTextoverlay from '~/components/LargeTextoverlay';

export default {
  components: {
    Header,
    Footer,
    Livestream,
    LargeTextoverlay
  },
  data() {
    return {
      eventStatusInterval: null,
      isDebugMode: process.env.isDebugMode
    };
  },
  computed: {
    isQueue() {
      return this.$nuxt.$route.path === '/';
    },
    eventIsRunning() {
      const openingDate = this.$moment(
        process.env.startEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const closingDate = this.$moment(
        process.env.endEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      return this.$moment().isBetween(openingDate, closingDate);
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
  middleware: ['checkPermission'],
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
