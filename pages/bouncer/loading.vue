<template>
  <div class="loading-wrapper">
    <div
      v-if="isLoading"
      class="loading-wheel ellipsis-anim"
    >
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
    <div v-else>
      <div v-if="accessGranted">
        Okay, Enjoy.<br>
        No screenshots!
      </div>
      <div v-else>
        Sorry, not today.
        <nuxt-link to="/line" class="button-link">Try again</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      isLoading: true,
      accessGranted: null
    }
  },
  watch: {
    accessGranted (val) {
      if (val) {
        const vm = this
        vm.$store.commit('setAccessGranted')
        setTimeout(() => {
          vm.$router.push({ path: '/mainfloor' })
        }, 3000)
      }
    }
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.isLoading = false
      const randomNum = Math.random()
      if (randomNum >= 0.3) {
        vm.accessGranted = true
      } else {
        vm.$gtag.event('rejection', {
          event_category: 'rejection',
          event_label: 'bouncer'
        })
        vm.accessGranted = false
      }
    }, 3000)
  }
}
</script>
