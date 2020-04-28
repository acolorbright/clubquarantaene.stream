const state = () => ({
  startDate: null,
  endDate: null,
  hasStarted: false,
  isRunning: false,
  hasEnded: false,
  isClosed: false,
  timeUntilStart: null,
  userCount: 1
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
  seEventIsClosed(state) {
    state.isClosed = true;
  },
  setTimeUntilStart(state, time) {
    state.hasEnded = true;
  },
  setEventStatus(state) {
    const start = process.env.startEventDate;
    const end = process.env.endEventDate;
    const closed = process.env.closedEventDate;

    const startDate = this.$moment(start, 'MM-DD-YYYY hh:mm A');
    const endDate = this.$moment(end, 'MM-DD-YYYY hh:mm A');
    const closingDate = this.$moment(closed, 'MM-DD-YYYY hh:mm A');

    const now = this.$moment(new Date());

    const timeUntilStart = this.$moment.duration(startDate.diff(now));
    state.timeUntilStart = timeUntilStart;

    const eventIsRunning = now.isBetween(startDate, endDate);
    const eventHasEnded = now.isAfter(endDate);

    if (eventIsRunning && !eventHasEnded) {
      state.hasStarted = true;
      state.isRunning = true;
    } else if (eventHasEnded) {
      state.hasEnded = true;
    }
  },
  setUserCount(state, count) {
    state.userCount = count;
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
  },
  setUserCount({ commit }, count) {
    commit('setUserCount', count);
  },
  setEventHasEnded({ commit }) {
    commit('setEventHasEnded');
  }
};

export default {
  state,
  mutations,
  actions
};
