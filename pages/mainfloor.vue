<template>
  <div class="mainfloor">
    Mainfloor
    <Chat />
  </div>
</template>

<script>
import Chat from '~/components/Chat';

export default {
  components: {
    Chat
  },
  mounted() {
    this.$gtag.pageview({
      page_path: '/mainfloor'
    });
  }
};
</script>
