<template>
  <div class="queue">
    <QueueCountdown v-if="showCountdown" />
    <form-wizard
      ref="formWizard"
      title=""
      subtitle=""
      next-button-text="next"
      back-button-text="back"
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
        <transition name="fade-step" mode="out-in">
          <component
            :is="step.type"
            v-if="stepIndex === activeStepIndex"
            :active="stepIndex === activeStepIndex"
            :data="step"
            :is-validated="step.isValidated"
            :step-index="stepIndex"
            class="step wizard-tab-component"
            :class="`step--${step.type}`"
            @nextStep="emitNextTab"
            @enterClub="emitEnterClub"
            @tryAgain="emitTryAgain"
          />
        </transition>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import QueueCountdown from './QueueCountdown.vue';
import Start from './views/Start.vue';
import Info from './views/Info.vue';
import Question from './views/Question.vue';
import Decision from './views/Decision';

export default {
  components: {
    QueueCountdown,
    Start,
    Info,
    Question,
    Decision
  },
  data() {
    return {
      showCountdown: false
    };
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
  watch: {
    activeStepIndex(stepIndex) {
      if (stepIndex >= 1) {
        this.handleCountdown();
      }
    }
  },
  methods: {
    ...mapActions({
      setStepIsValid: 'setStepIsValid',
      setActiveStepIndex: 'setActiveStepIndex'
    }),
    handleCountdown() {
      this.showCountdown = true;
    },
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
    emitNextTab() {
      this.nextTab();
    },
    emitEnterClub() {
      alert('enter club');
    },
    emitTryAgain() {
      this.changeTab(0);
    },
    changeTab(targetIndex) {
      this.$refs.formWizard.changeTab(this.activeStepIndex, targetIndex);
    },
    nextTab() {
      this.validateCurrentStep();
      this.$refs.formWizard.nextTab();
    },
    validateCurrentStep() {
      this.setStepIsValid({
        index: this.activeStepIndex,
        isValidated: true
      });
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
