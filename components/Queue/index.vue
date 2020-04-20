<template>
  <div class="queue">
    <div>{{ activeStepIndex + 1 }} / {{ steps.length }}</div>

    <form-wizard
      ref="formWizard"
      title=""
      subtitle=""
      next-button-text="next"
      back-button-text="back"
      finish-button-text="finish"
      color=""
      :class="{ isValidated }"
      :start-index="0"
      :validate-on-back="false"
      @on-change="onChangeTab"
      @on-complete="onComplete"
      @on-error="onError"
      @on-loading="onLoading"
      @on-validate="onValidate"
    >
      <tab-content
        v-for="(step, stepIndex) in steps"
        :key="step.title"
        :before-change="beforeChangeTab"
      >
        <transition name="fade" mode="out-in">
          <component
            :is="step.type"
            v-if="stepIndex === activeStepIndex"
            :active="stepIndex === activeStepIndex"
            :data="step"
            :step-index="stepIndex"
            class="queue-step wizard-tab-component"
            :class="`queue-step--${step.type}`"
            :form="$refs.formWizard"
          />
        </transition>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Start from './views/Start.vue';
import Info from './views/Info.vue';
import Question from './views/Question.vue';
import Decision from './views/Decision.vue';

export default {
  components: {
    Start,
    Info,
    Question,
    Decision
  },
  computed: {
    queue() {
      return this.$store.state.queue;
    },
    steps() {
      return this.queue.steps;
    },
    activeStepIndex() {
      return this.queue.activeStepIndex;
    },
    isValidated() {
      return this.steps[this.activeStepIndex].isValidated;
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      setActiveStepIndex: 'setActiveStepIndex'
    }),
    beforeChangeTab() {
      const allowNext = this.isValidated;
      return this.validateAsync(allowNext);
    },
    onChangeTab(indexFrom, indexTo) {
      this.handleTabChange(indexFrom, indexTo);
    },
    onComplete() {},
    onError(error) {
      if (error) {
        console.log(error);
      }
    },
    onLoading() {},
    onValidate(isValid, stepIndex) {},
    handleTabChange(indexFrom, indexTo) {
      if (indexTo >= 0) {
        this.setActiveStepIndex(indexTo);
      }
    },
    handleRefillStepsFromSessionStorage() {
      const storeData = this.getSessionStorage();
      const stepsShouldBeRefilled =
        storeData && storeData.steps.activeStepIndex > this.activeStepIndex;

      if (stepsShouldBeRefilled) {
        this.$refs.formWizard.changeTab(
          this.activeStepIndex,
          storeData.steps.activeStepIndex
        );
      }
    },
    validateAsync(allowNext) {
      this.$nuxt.$loading.start();

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(allowNext);
          this.$nuxt.$loading.finish();
        }, 50);
      });
    }
  }
};
</script>
