<template>
  <nav class="menu">
    <nuxt-link class="menu-live" to="/">
      <span class="menu-live-icon">Live</span>
      <span class="menu-live-counter">{{ userCount }} Guests</span>
    </nuxt-link>

    <ul class="menu-list">
      <li class="menu-list-item">
        <nuxt-link to="/bar">Bar</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/dancefloor">Dancefloor</nuxt-link>
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
export default {
  data() {
    return {
      userCount: 1
    };
  },
  sockets: {
    'total-users'(amount) {
      this.userCount = amount;
    }
  }
};
</script>
