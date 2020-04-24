const state = () => ({
  buttons: [
    {
      label: 'Wow',
      reaction: 'wow',
      progress: 0,
      achievementMsg: 'Entering Room'
    },
    {
      label: 'Reveal Artist',
      reaction: 'artist',
      progress: 0,
      achievementMsg: 'Artist image covering scene'
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
    if (state.buttons.find(button => button.reaction === key)) {
      const msg = state.buttons.find(button => button.reaction === key)
        .achievementMsg;
      state.largeTextoverlay = msg;
    } else {
      state.largeTextoverlay = key;
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
