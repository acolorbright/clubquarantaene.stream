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

        <div v-if="clubIsClosed || !isDebugMode">
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
      isDebugMode: process.env.isDebugMode,
      eventStartTriggered: false
    };
  },
  computed: {
    countdownUntilEventStarts() {
      return this.$store.state.event.timeUntilStart;
    },
    clubIsClosed() {
      const now = this.$moment(new Date());
      const openingDate = this.$moment(
        process.env.startEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const closingDate = this.$moment(
        process.env.closedEventDate,
        'MM-DD-YYYY hh:mm A'
      );
      const clubIsClosed =
        now.isBefore(openingDate) || now.isAfter(closingDate);

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
  watch: {
    countdownUntilEventStarts(val) {
      if (val <= 0) {
        this.startEvent();
      }
    }
  },
  mounted() {
    this.showStart = true;

    if (!this.clubIsClosed || process.env.isDebugMode) {
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
      if (this.eventStartTriggered) {
        return;
      }
      console.log('redirect yo');
      this.eventStartTriggered = true;
      const firstStartTimeout = process.env.isDebugMode ? 1000 : 3500;
      const secondStartTimeout = process.env.isDebugMode ? 2000 : 9500;

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
