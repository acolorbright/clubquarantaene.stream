<template>
  <div>
    <div class="homepage">
      <Logo />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    Logo
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.$router.push({ path: '/' })
    }, 4000)
  }
}
</script>
