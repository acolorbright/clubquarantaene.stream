const state = () => ({
  startDate: null,
  endDate: null,
  hasStarted: false,
  isRunning: false,
  hasEnded: false,
  timeUntilStart: null
});

const mutations = {
  setEventStartDate(state, date) {
    state.startDate = date;
  },
  setEventEndDate(state, date) {
    state.endDate = date;
  },
  setEventHasStarted(state) {
    state.hastStarted = true;
  },
  setEventIsRunning(state) {
    state.isRunning = true;
  },
  setEventHasEnded(state) {
    state.hasEnded = true;
  },
  setTimeUntilStart(state, time) {
    state.hasEnded = true;
  },
  setEventStatus(state) {
    const startDate = this.$moment('04-24-2020 10:00 PM', 'MM-DD-YYYY hh:mm A');
    const endDate = this.$moment('04-26-2020 10:00 AM', 'MM-DD-YYYY hh:mm A');
    const now = this.$moment(new Date());
    const eventIsRunning = now.isBetween(startDate, endDate);

    const timeUntilStart = this.$moment.duration(startDate.diff(now));
    state.timeUntilStart = timeUntilStart;

    if (eventIsRunning) {
      console.log('event is running');
    }
  }
};

const actions = {
  setStartDate({ commit }, date) {
    commit('setStartDate', date);
  },
  setEndDate({ commit }, date) {
    commit('setEndDate', date);
  },
  checkEventStatus({ commit }) {
    commit('setEventStatus');
  }
};

export default {
  state,
  mutations,
  actions
};
