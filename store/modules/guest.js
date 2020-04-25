const state = () => ({
  accessGranted: false,
  answers: [],
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  },
  userData: {
    room: '',
    uuid: '',
    name: ''
  },
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
  },
  setUserData(state, data) {
    state.userData = data;
  }
};

const actions = {
  setColor({ commit }, color) {
    commit('setColor', color);
  },
  setAccessGranted({ commit }, isGranted) {
    commit('setAccessGranted', isGranted);
  },
  setUserData({ commit }, colorResponse) {
    commit('setUserData', colorResponse);
  }
};

export default {
  state,
  mutations,
  actions
};
