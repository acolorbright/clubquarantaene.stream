import Vuex from 'vuex';
import event from './modules/event';
import queue from './modules/queue';
import timetable from './modules/timetable';
import guest from './modules/guest';
import livestream from './modules/livestream';
import oldState from './modules/oldState';
import interactivebuttons from './modules/interactivebuttons';

const store = () => {
  return new Vuex.Store({
    modules: {
      event,
      queue,
      timetable,
      guest,
      livestream,
      oldState,
      interactivebuttons
    }
  });
};

export default store;
