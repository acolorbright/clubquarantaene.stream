<template>
  <div class="mainfloor">
    Mainfloor
    <InteractiveButtons />
  </div>
</template>

<script>
import InteractiveButtons from '~/components/InteractiveButtons';

export default {
  components: {
    InteractiveButtons
  },
  mounted() {
    this.$gtag.pageview({
      page_path: '/mainfloor'
    });
  }
};
</script>
