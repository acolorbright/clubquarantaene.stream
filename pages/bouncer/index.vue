<template>
  <div class="entry center-layout large-type green-type allcaps">
    <Question
      v-for="(question, index) in $store.state.content.questions"
      :key="index"
      :question="question.question"
      :index="index"
    />
    <Loading v-if="$store.state.content.questionsAnswered" />
  </div>
</template>

<script>
import Question from './question.vue';
import Loading from './loading.vue';

export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: {
    Question,
    Loading
  }
};
</script>
