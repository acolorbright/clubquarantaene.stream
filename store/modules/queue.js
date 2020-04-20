const state = () => ({
  activeStep: 0,
  steps: [
    {
      component: 'Start',
      title: 'Start',
      key: 'start-step',
      isValidated: false
    }
  ]
});

const mutations = {
  setActiveIndex(state, index) {
    state.activeIndex = index;
  },
  setStepIsValid(state, { index, isValidated }) {
    state.steps[index].isValidated = isValidated;
  }
};

const actions = {
  setActiveStepIndex({ commit }, index) {
    commit('setActiveIndex', index);
  },
  setStepIsValid({ commit }, { index, isValidated }) {
    commit('setStepIsValid', {
      index,
      isValidated
    });
  }
};

export default {
  state,
  mutations,
  actions
};
