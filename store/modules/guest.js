const state = () => ({
  answers: [],
  color: '#0038FF',
  currentLocation: {
    name: 'Dancefloor', // dancefloor, cloakroom, bar, bathroom
    key: 'dancefloor'
  },
  onlineSince: new Date(),
  id: '123456789',
  isActive: false,
  isBlocked: false,
  isChatting: false,
  isInLine: true,
  isSubscribed: false,
  warnings: []
});

const mutations = {
  setColor(state, color) {
    state.color = color;
  }
};

const actions = {
  setColor({ commit }, color) {
    commit('setColor', color);
  }
};

export default {
  state,
  mutations,
  actions
};
