import Vuex from 'vuex';
import content from './modules/content';
import queue from './modules/queue';
import timetable from './modules/timetable';
import guest from './modules/guest';
import livestream from './modules/livestream';
import oldState from './modules/oldState';

const store = () => {
  return new Vuex.Store({
    modules: {
      content,
      queue,
      timetable,
      guest,
      livestream,
      oldState
    }
  });
};

export default store;
