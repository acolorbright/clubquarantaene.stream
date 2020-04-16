import Vuex from 'vuex'
import content from './modules/content'
import livestream from './modules/livestream'
import oldState from './modules/oldState'

const store = () => {
  return new Vuex.Store({
    modules: {
      content,
      livestream,
      oldState
    }
  })
}

export default store
