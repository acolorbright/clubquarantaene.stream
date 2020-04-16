import moment from 'moment-timezone'

const state = () => ({
  data: {},
  eventIsRunning: null,
  eventIsOver: null,
  currentQuestion: 0,
  questions: [
    {
      question: 'Question 1?',
      isCookieQuestion: false
    },
    {
      question: 'Question 2?',
      isCookieQuestion: false
    },
    {
      question: 'Question 3 Cookie?',
      isCookieQuestion: true
    }
  ],
  questionsAnswered: false
})

const mutations = {
  setContent (state, data) {
    state.data = data
    state.data.event.start = moment.tz(state.data.event.start, 'Europe/Berlin')
    state.data.event.end = moment.tz(state.data.event.end, 'Europe/Berlin')
    state.eventIsRunning = moment().tz('Europe/Berlin').isBetween(state.data.event.start, state.data.event.end)
    state.eventIsOver = moment().tz('Europe/Berlin').isAfter(state.data.event.end)
  },
  setEventIsRunning (state, data) {
    state.eventIsRunning = data
    state.eventIsOver = moment().tz('Europe/Berlin').isAfter(state.data.event.end)
  },
  nextQuestion (state) {
    state.currentQuestion++
    if (state.currentQuestion === state.questions.length) {
      state.questionsAnswered = true
    }
  }
}

// const actions = {
//   checkIfEventIsRunning (state, commit) {
//     const eventIsRunning = moment().tz('Europe/Berlin').isBetween(state.data.event.start, state.data.event.end)
//     if (eventIsRunning !== state.eventIsRunning) {
//       commit('setEventIsRunning', eventIsRunning)
//     }
//   }
// }

export default {
  state,
  mutations
}
