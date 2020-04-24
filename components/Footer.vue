<template>
  <footer
    class="footer"
    :class="{
      isQueue
    }"
  >
    <div class="footer-section footer-section--left">
      <transition name="fade">
        <Chat v-if="isDancefloor && showChat" :max-chat-history="17" />
      </transition>
      <transition name="fade">
        <div
          v-if="isDancefloor"
          @click="showChat = !showChat"
          class="chat-switch-button"
        >
          <span v-if="showChat">Hide Chat</span>
          <span v-else>Show Chat</span>
        </div>
      </transition>
      <a
        v-if="isTimetable"
        href="https://www.buymusic.club/list/club-quarantane-cq-2"
        target="_blank"
        class="button"
      >
        Tracks at BuyMusicClub↗
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
  data() {
    return {
      showChat: true
    };
  },
  computed: {
    currentRoute() {
      return this.$nuxt.$route;
    },
    isQueue() {
      return this.currentRoute.path === '/';
    },
    isDancefloor() {
      return this.currentRoute.name === 'dancefloor';
    },
    isTimetable() {
      return this.currentRoute.name === 'timetable';
    }
  }
};
</script>
