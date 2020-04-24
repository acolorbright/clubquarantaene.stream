const state = () => ({
  accessGranted: false,
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
  },
  setAccessGranted(state, isGranted) {
    state.accessGranted = isGranted;
  }
};

const actions = {
  setColor({ commit }, color) {
    commit('setColor', color);
  },
  setAccessGranted({ commit }, isGranted) {
    commit('setAccessGranted', isGranted);
  }
};

export default {
  state,
  mutations,
  actions
};
