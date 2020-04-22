export default ({ store, redirect, route }) => {
  const content = 'test content';
  store.dispatch('setContent', content);
};
