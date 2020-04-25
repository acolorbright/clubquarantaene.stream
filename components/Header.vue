<template>
  <nav
    class="menu"
    :class="{
      'menu--gradient': isTimetable || isBathroomChat
    }"
  >
    <div class="menu-live">
      <span v-if="eventIsRunning" class="menu-live-icon">&#xE000;</span>
      <span class="menu-live-counter">{{ userCount }} Guests</span>
    </div>

    <ul class="menu-list">
      <li
        v-for="page in pages"
        :key="page.key"
        class="menu-list-item"
        :class="{
          active: currentPath === page.to
        }"
      >
        <nuxt-link :to="page.to">{{ page.title }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      pages: [
        {
          title: 'Dancefloor',
          key: 'dancefloor',
          to: '/dancefloor'
        },
        {
          title: 'Bar',
          key: 'bar',
          to: '/bar'
        },
        {
          title: 'Cloakroom',
          key: 'cloakroom',
          to: '/cloakroom'
        },
        {
          title: 'Bathroom',
          key: 'bathroom',
          to: '/bathroom'
        },
        {
          title: 'Timetable',
          key: 'timetable',
          to: '/timetable'
        }
      ]
    };
  },
  computed: {
    userCount() {
      return this.$store.state.event.userCount;
    },
    eventIsRunning() {
      return this.$store.state.event.isRunning;
    },
    currentPath() {
      return this.$nuxt.$route.path;
    },
    isTimetable() {
      return this.$nuxt.$route.name === 'timetable';
    },
    isBathroomChat() {
      return this.$nuxt.$route.name === 'bathroom-bathroom';
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
