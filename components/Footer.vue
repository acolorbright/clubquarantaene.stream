<template>
  <footer
    class="footer"
    :class="{
      isQueue
    }"
  >
    <div class="footer-section footer-section--left">
      <Chat v-if="isDancefloor" :max-chat-history="30" />
      <a
        v-if="isTimetable"
        href="https://www.buymusic.club/list/club-quarantane-cq-2"
        target="_blank"
        class="button"
      >
        Get tracks from BuyMusicClub↗
      </a>
    </div>

    <div v-if="isDancefloor" class="footer-section footer-section--center">
      <InteractiveButtons />
    </div>

    <div class="footer-section footer-section--right">
      <nuxt-link to="/imprint">Imprint</nuxt-link>
    </div>
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
