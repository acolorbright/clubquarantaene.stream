<template>
  <div class="question-wrapper" v-if="index === $store.state.content.currentQuestion">
    <div class="question" v-html="question"/>
    <div class="buttons">
      <button @click="handleClick(true)">Yes</button>
      <button @click="handleClick(false)">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: String,
    index: Number
  },
  methods: {
    handleClick (val) {
      console.log('clicked')
      this.$store.commit('nextQuestion')
    }
  }
}
</script>
