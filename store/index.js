import Vuex from 'vuex';
import content from './modules/content';
import queue from './modules/queue';
import bar from './modules/bar';
import imprint from './modules/imprint';
import cloakroom from './modules/cloakroom';
import timetable from './modules/timetable';
import guest from './modules/guest';
import livestream from './modules/livestream';
import oldState from './modules/oldState';
import interactivebuttons from './modules/interactivebuttons';

const store = () => {
  return new Vuex.Store({
    modules: {
      content,
      queue,
      bar,
      cloakroom,
      imprint,
      timetable,
      guest,
      livestream,
      oldState,
      interactivebuttons
    }
  });
};

export default store;
