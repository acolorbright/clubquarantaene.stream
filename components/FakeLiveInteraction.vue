<template>
  <div ref="liveInteraction" class="live-interaction" />
</template>
<script>
export default {
  name: 'FakeLiveInteraction',
  data () {
    return {
      interaction: null,
      lifespan: 500
    }
  },
  computed: {
    max () {
      return 600000 / this.$store.state.oldState.users
    },
    min () {
      return 50000 / this.$store.state.oldState.users
    }
  },
  mounted () {
    this.startLoop()
  },
  methods: {
    spawnPlusOne () {
      const newDiv = document.createElement('div')
      newDiv.className = `plus-one item-${Math.round(Math.random() * (5 - 1)) + 1}`
      const newContent = document.createTextNode('+1')
      newDiv.appendChild(newContent)
      this.$refs.liveInteraction.appendChild(newDiv)
      setTimeout(function () {
        newDiv.parentNode.removeChild(newDiv)
      }, this.lifespan)
    },
    startLoop () {
      const rand = Math.round(Math.random() * (this.max - this.min)) + this.min
      const vm = this
      setTimeout(function () {
        vm.spawnPlusOne()
        vm.startLoop()
      }, rand)
    }
  }
}
</script>
