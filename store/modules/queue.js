const queueCountdownTime = process.env.isDev ? 3 : 30;

const state = () => ({
  countdown: {
    isRunning: false,
    value: queueCountdownTime
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
      title: 'How it works',
      text:
        'Once you’re in, select a color. It will be your avatar––connected to you and you only. \nEach color can only be selected once and can’t be changed. Choose wisely. Have fun.',
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
      title: 'Warning',
      text:
        'This site may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised.',
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
      action: 'cookies',
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
  },
  unvalidateSteps(state) {
    const newStepState = state.steps.map(step => ({
      ...step,
      isValidated: false
    }));

    state.steps = newStepState;
  },
  reduceCountdown(state) {
    state.countdown.value -= 1;
  },
  resetCountdown(state) {
    state.countdown = {
      isRunning: false,
      value: queueCountdownTime
    };
  },
  setQueueCountdownIsRunning(state, isRunning) {
    state.countdown.isRunning = isRunning;
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
  },
  unvalidateSteps({ commit }) {
    commit('unvalidateSteps');
  },
  resetCountdown({ commit }) {
    commit('resetCountdown');
  },
  reduceCountdown({ commit }) {
    commit('reduceCountdown');
  },
  setQueueCountdownIsRunning({ commit }, isRunning) {
    commit('setQueueCountdownIsRunning', isRunning);
  },
  resetQueue({ commit }) {
    commit('unvalidateSteps');
    commit('resetCountdown');
  }
};

export default {
  state,
  mutations,
  actions
};
