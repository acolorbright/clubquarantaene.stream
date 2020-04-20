const state = () => ({
  activeStepIndex: 0,
  steps: [
    {
      title: 'Start',
      type: 'start',
      isValidated: false
    },
    {
      title: 'Info 1',
      type: 'info',
      isValidated: false
    },
    {
      title: 'Info 2',
      type: 'info',
      isValidated: false
    },
    {
      title: 'Question 1',
      type: 'question',
      isValidated: false
    },
    {
      title: 'Question 2',
      type: 'question',
      isValidated: false
    },
    {
      title: 'Decision',
      type: 'decision',
      isValidated: false
    }
  ]
});

const mutations = {
  setActiveIndex(state, index) {
    state.activeStepIndex = index;
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
