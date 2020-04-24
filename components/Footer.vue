<template>
  <footer
    class="footer"
    :class="{
      isDancefloor
    }"
  >
    <div class="footer-chat">
      <Chat />
    </div>
    <div class="footer-buttons">
      <InteractiveButtons />
    </div>
    <nuxt-link class="footer-imprint" to="/imprint">
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
    isDancefloor() {
      return this.currentRoute.path === '/dancefloor';
    }
  }
};
</script>
