<template>
  <nav class="footer">
    <div class="left-menu">
      <span
        @click="
          $store.commit('showTimetable', !$store.state.oldState.showTimetable)
        "
        >Timetable</span
      >
    </div>
    <!-- <div class="right-menu">
      <InteractiveButtons />
    </div> -->
  </nav>
</template>
<script>
// import InteractiveButtons from '../components/InteractiveButtons.vue';
export default {
  name: 'FooterMenu'
  // components: { InteractiveButtons }
};
</script>
