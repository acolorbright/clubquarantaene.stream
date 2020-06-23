const state = () => ({
  buttons: [
    {
      label: 'Change 🎥',
      reaction: 'camchange',
      progress: 0,
      achievementMsg: 'Changing camera shortly',
      isBlocked: false
    },
    {
      label: 'Drip 🥑',
      reaction: 'trip',
      progress: 0,
      achievementMsg: 'Trip begins shortly',
      isBlocked: false
    }
  ],
  largeTextoverlay: ''
});

const mutations = {
  setProgressBar(state, key) {
    const reactionButton = state.buttons.find(
      button => button.reaction === key.name
    );
    if (reactionButton) {
      reactionButton.progress = key.percent;
    }
  },
  setLargeTextoverlay(state, key) {
    if (state.buttons.find(button => button.reaction === key)) {
      const msg = state.buttons.find(button => button.reaction === key)
        .achievementMsg;
      state.largeTextoverlay = msg;
    } else {
      state.largeTextoverlay = key;
    }
  },
  setButtonIsBlocked(state, { key, isBlocked }) {
    const reactionButton = state.buttons.find(
      button => button.reaction === key
    );
    if (reactionButton) {
      reactionButton.isBlocked = isBlocked;
    }
  }
};

const actions = {
  setProgressBar({ commit }, key) {
    commit('setProgressBar', key);
  },
  setLargeTextoverlay({ commit }, key) {
    commit('setLargeTextoverlay', key);
  },
  setButtonIsBlocked({ commit }, data) {
    commit('setButtonIsBlocked', data);
  }
};

export default {
  state,
  mutations,
  actions
};
