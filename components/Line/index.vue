<template>
  <div class="steps">
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
        v-for="(tab, tabIndex) in tabs"
        :key="tab.title"
        :title="tab.title"
        :before-change="beforeChangeTab"
      >
        <transition name="fade-short" mode="out-in">
          <component
            :is="tab.component"
            v-show="tabIndex === activeIndex"
            class="wizard-tab-component"
            :active="tabIndex === activeIndex"
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
import Statements from './steps/Statements.vue';
import Selfie from './steps/Selfie.vue';
import PersonalData from './steps/PersonalData.vue';
import Result from './steps/Result.vue';
import Thanks from './steps/Thanks.vue';
import {
  setSessionStorage,
  getSessionStorage,
  resetSessionStorage
} from '~/assets/utils/handleSessionStorage.js';

export default {
  components: {
    Start,
    Statements,
    Selfie,
    PersonalData,
    Result,
    Thanks
  },
  data: () => {
    return {
      cameraDisabled: true
    };
  },
  computed: {
    nextButtonText() {
      return 'next button';
    },
    storeData() {
      return this.$store.state;
    },
    tabs() {
      return this.$store.state.steps.steps;
    },
    activeIndex() {
      return this.$store.state.steps.activeIndex;
    },
    isValidated() {
      return this.tabs[this.activeIndex].isValidated;
    },
    useInBrowserCamera() {
      return this.$device.isDesktop;
    }
  },
  mounted() {
    this.handleRefillStepsFromSessionStorage();
  },
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
    setSessionStorage() {
      setSessionStorage(this.storeData);
    },
    getSessionStorage() {
      const storeData = getSessionStorage();
      return storeData;
    },
    resetSessionStorage() {
      resetSessionStorage();
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
        storeData && storeData.steps.activeIndex > this.activeIndex;

      if (stepsShouldBeRefilled) {
        this.$refs.formWizard.changeTab(
          this.activeIndex,
          storeData.steps.activeIndex
        );
      }
    },
    validateAsync(allowNext) {
      this.$nuxt.$loading.start();

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(allowNext);

          if (this.activeIndex === 4) {
            this.$nuxt.$loading.finish();
          }
        }, 750);
      });
    }
  }
};
</script>
