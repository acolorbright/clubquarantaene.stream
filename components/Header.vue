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
        <transition name="fade">
          <Popup
            :text="donationPopup.message"
            v-if="
              donationPopup.show &&
              page.title === 'Bar' &&
              $nuxt.$route.name !== 'bar'
            "
          />
        </transition>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapActions } from 'vuex';
import Popup from './../components/Popup';

export default {
  components: { Popup },
  data() {
    return {
      pages: [
        {
          title: 'Bar',
          key: 'bar',
          to: '/bar'
        },
        {
          title: 'Dancefloor',
          key: 'dancefloor',
          to: '/dancefloor'
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
      ],
      donationPopup: {
        message: 'Do not forget to donate :-)',
        show: false,
        duration: 5000, // 5s
        interval: 600000 // 10min (10 x 60000)
      }
    };
  },
  computed: {
    userCount() {
      // use thousand separators
      return this.$store.state.event.userCount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
    }),
    showPopup(duration, interval) {
      this.donationPopup.show = true;
      setTimeout(() => {
        this.donationPopup.show = false;
      }, duration);
      if (interval) {
        setTimeout(() => {
          this.showPopup(duration, interval);
        }, interval);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.showPopup(this.donationPopup.duration, this.donationPopup.interval);
    }, this.donationPopup.interval);
  },
  sockets: {
    'total-users'(amount) {
      this.setUserCount(amount);
    }
  }
};
</script>
