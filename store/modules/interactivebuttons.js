const state = () => ({
  buttons: [
    {
      label: 'Change 🎥',
      reaction: 'camchange',
      progress: 0,
      achievementMsg: 'Camera will change in ~20s',
      isBlocked: false
    },
    {
      label: 'Drip 🥑',
      reaction: 'trip',
      progress: 0,
      achievementMsg: 'Woooow in ~20s',
      isBlocked: false
    },
    {
      label: 'Show DJ 🎧',
      reaction: 'dj',
      progress: 0,
      achievementMsg: 'Cool DJ showing here',
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
  setCustomTextoverlay(state, text) {
    state.largeTextoverlay = text;
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
  setCustomTextoverlay({ commit }, key) {
    commit('setCustomTextoverlay', key);
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
