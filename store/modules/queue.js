const state = () => ({
  activeStepIndex: 0,
  steps: [
    {
      title: 'You are in line.',
      type: 'start',
      isValidated: false
    },
    {
      title: 'How this works',
      text: 'Text text text',
      type: 'info',
      isValidated: false
    },
    {
      title: 'House rules',
      text: 'Text text text',
      type: 'info',
      isValidated: false
    },
    {
      title: 'Do you know who’s playing tonight',
      text: 'Text text text',
      type: 'question',
      isValidated: false
    },
    {
      title: 'Do you accept cookies?',
      text: 'Text text text',
      type: 'question',
      isValidated: false
    },
    {
      title: 'Decision',
      text: 'Text text text',
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
