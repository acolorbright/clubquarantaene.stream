<template>
  <nav class="menu">
    <nuxt-link class="menu-live" to="/">
      <span class="menu-live-icon">Live</span>
      <span class="menu-live-counter">{{ userCount }} Guests</span>
    </nuxt-link>

    <ul class="menu-list">
      <li class="menu-list-item">
        <nuxt-link to="/dancefloor">Dancefloor</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/bar">Bar</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/cloakroom">Cloakroom</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/bathroom">Bathroom</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/timetable">Timetable</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    userCount() {
      return this.$store.state.event.userCount;
    }
  },
  methods: {
    ...mapActions({
      setUserCount: 'setUserCount'
    })
  },
  sockets: {
    'total-users'(amount) {
      this.setUserCount(amount);
    }
  }
};
</script>
