<template>
  <div class="queue">
    <transition name="fade" mode="out-in">
      <QueueCountdown v-if="queueCounterIsRunning" :small="countdownIsSmall" />
    </transition>

    <!-- <button @click="setStorage">set storage</button>
    <button @click="resetStorage">reset storage</button>
    <button @click="getStorage">get storage</button>
    <div>Active step index: {{ activeStepIndex }}</div> -->

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
            :has-started="eventHasStarted"
            :counter-is-running="queueCounterIsRunning"
            @enterClub="emitEnterClub"
            @nextStep="emitNextTab"
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
import {
  setLocalStorage,
  getLocalStorage,
  resetLocalStorage
} from '~/assets/js/handleLocalStorage.js';

export default {
  components: {
    QueueCountdown,
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
    },
    queueCounterIsRunning() {
      const { isRunning, value } = this.$store.state.queue.countdown;
      return isRunning && value > 0;
    },
    event() {
      return this.$store.state.event;
    },
    eventHasStarted() {
      return this.event.hasStarted;
    },
    countdownIsSmall() {
      return this.activeStepIndex > 0 && this.activeStepIndex < 4;
    }
  },
  mounted() {
    const localStorageData = getLocalStorage();

    if (localStorageData && localStorageData.color) {
      this.skipQueue();
    }
  },
  methods: {
    ...mapActions({
      setStepIsValid: 'setStepIsValid',
      setActiveStepIndex: 'setActiveStepIndex',
      resetQueue: 'resetQueue',
      clearCountdown: 'clearCountdown'
    }),
    beforeChangeTab() {
      const allowNext = this.isValidated;
      return this.validateAsync(allowNext);
    },
    onChangeTab(indexFrom, indexTo) {
      this.handleTabChange(indexFrom, indexTo);
    },
    onComplete() {},
    onError() {},
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
      this.$router.push('/bar');
    },
    emitTryAgain() {
      this.resetQueue();
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
    },
    skipQueue() {
      this.clearCountdown();
      this.changeTab(6); // Go to color picker step
    },
    setStorage() {
      setLocalStorage({
        acceptedCookies: false,
        color: '0,0,0',
        donated: false
      });
    },
    resetStorage() {
      resetLocalStorage();
    },
    getStorage() {
      const localStorage = getLocalStorage();
      console.log(localStorage);
    }
  }
};
</script>
