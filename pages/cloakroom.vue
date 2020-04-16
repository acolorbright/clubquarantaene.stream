<template>
  <div class="bar cloakroom">
    <h1><a href="https://everpress.com/club-quarantane" target="_blank">Cloakroom↗</a></h1>
    <div class="fullscreen-bg">
      <video loop muted playsinline autoplay class="fullscreen-bg__video">
        <source src="/assets/videos/cloakroom.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  mounted () {
    this.$store.commit('setFirstQuestion', true)
    this.$store.commit('setSecondQuestion', true)
    this.$store.commit('setThirdQuestion', true)
    this.$store.commit('setFourthQuestion', true)
    this.$gtag.pageview({ page_path: '/cloakroom' })
  }
}
</script>
