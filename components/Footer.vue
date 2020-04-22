<template>
  <footer class="footer">
    <div class="footer-chat">Chat</div>
    <div class="footer-buttons">
      <InteractiveButtons />
    </div>
    <nuxt-link class="footer-imprint" to="/imprint">Imprint</nuxt-link>
  </footer>
</template>

<script>
import InteractiveButtons from './InteractiveButtons';

export default {
  components: {
    InteractiveButtons
  }
};
</script>
