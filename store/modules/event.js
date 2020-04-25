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
    const start = '04-24-2020 21:59 PM';
    const end = '04-24-2020 22:31 PM';
    const closed = '04-26-2020 23:59 AM';

    const startDate = this.$moment(start, 'MM-DD-YYYY hh:mm A');
    const endDate = this.$moment(end, 'MM-DD-YYYY hh:mm A');
    const closingDate = this.$moment(closed, 'MM-DD-YYYY hh:mm A');

    const now = this.$moment(new Date());

    const timeUntilStart = this.$moment.duration(startDate.diff(now));
    state.timeUntilStart = timeUntilStart;

    const eventIsRunning = now.isBetween(startDate, endDate);
    const eventHasEnded = now.isAfter(endDate);
    const clubIsClosed = now.isAfter(closingDate);

    if (eventIsRunning && !eventHasEnded) {
      state.hasStarted = true;
      state.isRunning = true;
    } else if (eventHasEnded) {
      state.hasEnded = true;
    }

    if (clubIsClosed) {
      this.$router.push('/');
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
