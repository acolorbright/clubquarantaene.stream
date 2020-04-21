const state = () => ({
  countdown: {
    isRunning: false,
    value: 30
  },
  answers: {
    knowsWhosPlaying: null,
    cookiesAccepted: null
  },
  activeStepIndex: 0,
  form: null,
  steps: [
    {
      title: 'Club Quarantäne',
      type: 'start',
      isValidated: false
    },
    {
      title: 'How this works',
      text:
        'Once you’re let in, you’ll be allowed to pick a color of your choice. It will be your avatar and the way to reach you. So chose wisely, as each color exists only once. First come, first serve.',
      type: 'info',
      isValidated: false
    },
    {
      title: 'House rules',
      text:
        'Racism, homophobia, transphobia and sexism are not acceptable in any club and will not be allowed as part of this virtual experience. No hate speech, bullying, trolling or hostility. Please respect each other.',
      type: 'info',
      isValidated: false
    },
    {
      title: 'Do you know who’s playing tonight',
      type: 'question',
      isValidated: false
    },
    {
      title: 'Do you accept cookies?',
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
