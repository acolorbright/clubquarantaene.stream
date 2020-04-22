const state = () => ({
  content: null,
  eventIsRunning: null
});

const mutations = {
  setContent(state, data) {
    state.content = data;
  }
};

const actions = {
  setContent({ commit }, data) {
    commit('setContent', data);
  }
};

export default {
  state,
  mutations,
  actions
};
