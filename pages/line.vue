<template>
  <div class="entry center-layout large-type green-type">
    <div class="allcaps">
      You are in line.
    </div>
    <div class="countdown">
      <span>:</span>{{ countdown }}<span>s</span>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      countdown: 30,
      min: 5,
      max: 30,
      interval: null
    }
  },
  watch: {
    countdown (val) {
      if (val === 0) {
        clearInterval(this.interval)
        this.$router.push({ path: '/bouncer' })
      }
    }
  },
  mounted () {
    this.startCountdown()
  },
  methods: {
    startCountdown () {
      const vm = this
      vm.interval = setInterval(() => {
        vm.countdown -= 1
      }, 1000)
    }
  }
}
</script>
