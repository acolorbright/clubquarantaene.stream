const state = () => ({
  buttons: [
    {
      label: 'Grow Vines',
      reaction: 'grow',
      progress: 0
    },
    {
      label: 'Reveal Artist',
      reaction: 'artist',
      progress: 0
    },
    {
      label: 'Trip',
      reaction: 'wow',
      progress: 0
    }
  ]
});

const mutations = {
  setProgressBar(state, key) {
    state.buttons.find(button => button.reaction === key.name).progress =
      key.percent;
  }
};

const actions = {
  setProgressBar({ commit }, key) {
    commit('setProgressBar', key);
  }
};

export default {
  state,
  mutations,
  actions
};
