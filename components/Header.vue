<template>
  <nav
    class="menu"
    :class="{
      'menu--gradient': isTimetable || isBathroomChat
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
        <nuxt-link v-if="!page.to.startsWith('http')" :to="page.to">
          {{ page.title }}
        </nuxt-link>
        <a v-else :href="page.to" target="_blank">{{ page.title }}&nearr;</a>
        <transition name="fade">
          <Popup
            v-if="
              donationPopup.show &&
              page.title === 'Bar' &&
              $nuxt.$route.name !== 'bar'
            "
            :text="donationPopup.message"
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
          title: 'Bathroom',
          key: 'bathroom',
          to: '/bathroom'
        },
        {
          title: 'Cloakroom',
          key: 'cloakroom',
          to: 'https://shop.clubquarantaene.stream/'
        },
        {
          title: 'Gallery',
          key: 'gallery',
          to: 'https://implied.gallery/'
        },
        {
          title: 'CQ×UB',
          key: 'cqxub',
          to: 'http://undergroundblack.clubquarantaene.stream/'
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
      },
      endEventTimeout: null
    };
  },
  computed: {
    userCount() {
      // use thousand separators
      return this.$store.state.event.userCount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  mounted() {
    setTimeout(() => {
      this.showPopup(this.donationPopup.duration, this.donationPopup.interval);
    }, this.donationPopup.interval);

    this.setEndEventTimeout();
  },
  sockets: {
    'total-users'(amount) {
      this.setUserCount(amount);
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
    },
    setEndEventTimeout() {
      const closingDate = this.$moment(
        process.env.endEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const timeUntilEnd = closingDate.diff(Date.now());
      if (timeUntilEnd >= 0) {
        this.endEventTimeout = setTimeout(() => {
          this.$router.push('/');
        }, timeUntilEnd);
      }
    }
  }
};
</script>
