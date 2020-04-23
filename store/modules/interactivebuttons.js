const state = () => ({
  buttons: [
    {
      label: 'Grow Vines',
      reaction: 'grow',
      progress: 0,
      achievementMsg: 'Vines unlocked!'
    },
    {
      label: 'Reveal Artist',
      reaction: 'artist',
      progress: 0,
      achievementMsg: 'Revealation unlocked!'
    },
    {
      label: 'Trip',
      reaction: 'wow',
      progress: 0,
      achievementMsg: 'Get ready!'
    }
  ],
  largeTextoverlay: ''
});

const mutations = {
  setProgressBar(state, key) {
    state.buttons.find(button => button.reaction === key.name).progress =
      key.percent;
  },
  setLargeTextoverlay(state, key) {
    if (key) {
      const msg = state.buttons.find(button => button.reaction === key)
        .achievementMsg;
      state.largeTextoverlay = msg;
    } else {
      state.largeTextoverlay = '';
    }
  }
};

const actions = {
  setProgressBar({ commit }, key) {
    commit('setProgressBar', key);
  },
  setLargeTextoverlay({ commit }, key) {
    commit('setLargeTextoverlay', key);
  }
};

export default {
  state,
  mutations,
  actions
};
