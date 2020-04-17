<template>
  <div class="mainfloor" />
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
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
