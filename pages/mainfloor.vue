<template>
  <div class="mainfloor">
    <InteractiveButtons />
  </div>
</template>

<script>
import InteractiveButtons from './../components/InteractiveButtons/index.vue';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    InteractiveButtons
  },
  // beforeMount () {
  //   if (!this.$store.state.questions.firstQuestionAnswered && this.$store.state.lockRooms) {
  //     this.$router.push({ path: '/line' })
  //   }
  // },
  mounted() {
    this.$gtag.pageview({ page_path: '/mainfloor' });
  }
};
</script>
