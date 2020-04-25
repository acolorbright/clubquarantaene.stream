<template>
  <nav
    class="menu"
    :class="{
      'menu--gradient': isTimetable
    }"
  >
    <div class="menu-live">
      <span class="menu-live-icon">&#xE000;</span>
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
    currentPath() {
      return this.$nuxt.$route.path;
    },
    isTimetable() {
      return this.$nuxt.$route.name === 'timetable';
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
