<template>
  <div>
    <div class="homepage" :style="bgStyleObj">
      <Logo />
      <Countdown v-if="showCountdown" />
      <Newsletter v-if="$store.state.content.data.settings.showNewsletter" />
      <div
        v-if="$store.state.content.data.content.text"
        class="splashpage-text"
        v-html="$store.state.content.data.content.text"
      />
    </div>
  </div>
</template>

<script>
import Countdown from '~/components/Countdown'
import Logo from '~/components/Logo'
import Newsletter from '~/components/Newsletter'

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    Logo,
    Countdown,
    Newsletter
  },
  computed: {
    showCountdown () {
      return !this.$store.state.content.eventIsRunning && !this.$store.state.content.eventIsOver
    },
    bgStyleObj () {
      const primaryColor = this.$store.state.content.data.settings.color
      return {
        background: `radial-gradient(
          50% 50% at 50% 50%,
          ${primaryColor} 0%,
          #ffffff 18.23%,
          ${primaryColor} 29.69%,
          #ffffff 61.98%,
          #ffffff 66.15%,
          ${primaryColor} 79.69%,
          #ffffff 88.54%,
          ${primaryColor} 95.83%
        )`
      }
    }
  }
}
</script>
