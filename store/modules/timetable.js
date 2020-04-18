const state = () => ({
  artists: [
    {
      name: '',
      genre: '',
      id: '123456789',
      color: '#000000',
      startTime: new Date(),
      endTime: new Date(),
      isPlaying: false,
      isDelayed: false,
      exceededTimeLimit: false
    }
  ]
});

const mutations = {
  setArtist(state, data) {
    state.artists = data;
  }
};

const actions = {
  setArtists({ commit }, data) {
    commit('setArtistList', data);
  }
};

export default {
  state,
  mutations,
  actions
};
