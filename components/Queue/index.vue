<template>
  <div>
    steps
    <form-wizard
      ref="formWizard"
      title=""
      subtitle=""
      :next-button-text="nextButtonText"
      back-button-text="back"
      finish-button-text="finish"
      color=""
      error-color="#f00"
      :start-index="0"
      :validate-on-back="false"
      @on-change="onChangeTab"
      @on-complete="onComplete"
      @on-error="onError"
      @on-loading="onLoading"
      @on-validate="onValidate"
    >
      <tab-content
        v-for="(tab, tabIndex) in steps"
        :key="tab.title"
        :title="tab.title"
        :before-change="beforeChangeTab"
      >
        <transition name="fade-short" mode="out-in">
          <component
            :is="tab.component"
            v-show="tabIndex === activeStepIndex"
            class="wizard-tab-component"
            :active="tabIndex === activeStepIndex"
            :step-index="tabIndex"
            :form="$refs.formWizard"
          />
        </transition>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Start from './steps/Start.vue';

export default {
  components: {
    Start
  },
  computed: {
    nextButtonText() {
      return 'next button';
    },
    steps() {
      return this.$store.state.queue.steps;
    },
    activeStepIndex() {
      return this.$store.state.queue.activeStepIndex;
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
    handleTabChange(indexFrom, indexTo) {
      if (indexTo >= 0) {
        this.setActiveStepIndex(indexTo);
        this.setSessionStorage();
      }
    },
    beforeChangeTab() {
      const allowNext = this.isValidated;
      return this.validateAsync(allowNext);
    },
    onChangeTab(indexFrom, indexTo) {
      this.handleTabChange(indexFrom, indexTo);
    },
    onComplete() {
      this.resetSessionStorage();
    },
    onError(error) {
      if (error) {
        console.log(error);
      }
    },
    onLoading() {},
    onValidate(isValid, tabIndex) {},
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

          if (this.activeStepIndex === 4) {
            this.$nuxt.$loading.finish();
          }
        }, 750);
      });
    }
  }
};
</script>
