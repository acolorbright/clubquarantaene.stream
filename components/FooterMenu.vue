<template>
  <nav class="footer">
    <div class="left-menu">
      <span @click="$store.commit('showTimetable', !$store.state.oldState.showTimetable)">Timetable</span>
    </div>
    <div class="right-menu">
      <OffworldButtons />
    </div>
  </nav>
</template>
<script>
import OffworldButtons from '../components/OffworldButtons.vue'
export default {
  components: { OffworldButtons },
  name: 'FooterMenu'
}
</script>
