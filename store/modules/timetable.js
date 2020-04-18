const state = () => ({
  artists: []
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
