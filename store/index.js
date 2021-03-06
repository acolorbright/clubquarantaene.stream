import Vuex from 'vuex';
import content from './modules/content';
import event from './modules/event';
import queue from './modules/queue';
import guest from './modules/guest';
import livestream from './modules/livestream';
import oldState from './modules/oldState';
import interactivebuttons from './modules/interactivebuttons';

const store = () => {
  return new Vuex.Store({
    modules: {
      content,
      event,
      queue,
      guest,
      livestream,
      oldState,
      interactivebuttons
    }
  });
};

export default store;
