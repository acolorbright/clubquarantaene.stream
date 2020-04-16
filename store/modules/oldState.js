const state = () => ({
  // lockRooms: false,
  lockRooms: true,
  users: 1,
  rooms: [],
  horse: 0,
  snowflake: 0,
  lightning: 0,
  questions: {
    firstQuestionAnswered: false,
    secondQuestionAnswered: false,
    thirdQuestionAnswered: false,
    fourthQuestionAnswered: false
  },
  accessGranted: false,
  showTimetable: false,
  showButtonOverlay: true,
  eventIsOver: false
})

const mutations = {
  setUsers (state, value) {
    state.users = value
  },
  setEventIsOver (state) {
    state.eventIsOver = true
  },
  setRooms (state, value) {
    state.rooms = value
  },
  setFirstQuestion (state, value) {
    state.questions.firstQuestionAnswered = value
  },
  setSecondQuestion (state, value) {
    state.questions.secondQuestionAnswered = value
  },
  setThirdQuestion (state, value) {
    state.questions.thirdQuestionAnswered = value
  },
  setFourthQuestion (state, value) {
    state.questions.fourthQuestionAnswered = value
  },
  setAccessGranted (state) {
    state.accessGranted = true
  },
  setHorse (state) {
    if (state.horse < 1) {
      state.snowflake = 0
      state.lightning = 0
      state.horse++
    }
  },
  setLightning (state) {
    if (state.lightning < 1) {
      state.horse = 0
      state.snowflake = 0
      state.lightning++
    }
  },
  setSnowflake (state) {
    if (state.snowflake < 1) {
      state.horse = 0
      state.lightning = 0
      state.snowflake++
    }
  },
  resetEmojis (state) {
    state.horse = 0
    state.snowflake = 0
    state.lightning = 0
  },
  showTimetable (state, val) {
    state.showTimetable = val
  },
  setShowButtonOverlay (state) {
    state.showButtonOverlay = false
  }
}

export default {
  state,
  mutations
}
