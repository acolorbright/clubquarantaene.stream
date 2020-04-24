<template>
  <footer
    class="footer"
    :class="{
      isQueue
    }"
  >
    <div class="footer-section footer-section--left">
      <Chat v-if="isDancefloor" />
      <a v-if="isTimetable" href="/" target="_blank" class="button">
        BuyMusicClub
      </a>
    </div>

    <div v-if="isDancefloor" class="footer-section footer-section--center">
      <InteractiveButtons />
    </div>

    <nuxt-link class="footer-section footer-section--right" to="/imprint">
      Imprint
    </nuxt-link>
  </footer>
</template>

<script>
import InteractiveButtons from './InteractiveButtons';
import Chat from '~/components/Chat';

export default {
  components: {
    Chat,
    InteractiveButtons
  },
  computed: {
    currentRoute() {
      return this.$nuxt.$route;
    },
    isQueue() {
      return this.currentRoute.path === '/';
    },
    isDancefloor() {
      return this.currentRoute.path === '/dancefloor';
    },
    isTimetable() {
      return this.currentRoute.path === '/timetable';
    }
  }
};
</script>
