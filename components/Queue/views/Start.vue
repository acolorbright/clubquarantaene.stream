<template>
  <div
    class="start"
    :class="{
      'start-gradient': showStart
    }"
  >
    <transition name="fade-step" mode="out-in">
      <div v-if="showStart" class="start-content">
        <Logo />
        <div v-if="clubIsClosed">
          <Countdown />
          <Newsletter />
          <SocialIcons />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Logo from '~/components/Logo.vue';
import Countdown from '~/components/Countdown.vue';
import Newsletter from '~/components/Newsletter.vue';
import SocialIcons from '~/components/SocialIcons.vue';

export default {
  components: {
    Logo,
    Countdown,
    Newsletter,
    SocialIcons
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    hasStarted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showStart: false,
      isDev: process.env.isDev
    };
  },
  computed: {
    clubIsClosed() {
      const now = this.$moment(new Date());
      const closingDate = this.$moment(
        process.env.closedEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const clubIsClosed = now.isAfter(closingDate);

      return clubIsClosed;
    },
    eventHasEnded() {
      const now = this.$moment(new Date());
      const endTime = this.$moment(
        process.env.endEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const eventHasEnded = now.isAfter(endTime);

      return eventHasEnded;
    }
  },
  mounted() {
    this.showStart = true;

    if (!this.clubIsClosed) {
      if (this.eventHasEnded) {
        // this.setEventHasEnded();
      }

      this.startEvent();
    }
  },
  methods: {
    ...mapActions({
      setQueueCountdownIsRunning: 'setQueueCountdownIsRunning',
      setEventHasEnded: 'setEventHasEnded'
    }),
    nextStep() {
      this.$emit('nextStep', true);
    },
    startEvent() {
      const firstStartTimeout = this.isDev ? 1000 : 3500;
      const secondStartTimeout = this.isDev ? 2000 : 9500;

      setTimeout(() => {
        this.showStart = false;
        this.setQueueCountdownIsRunning(true);
      }, firstStartTimeout);

      setTimeout(() => {
        this.nextStep();
      }, secondStartTimeout);
    }
  }
};
</script>
