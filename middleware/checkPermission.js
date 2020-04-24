export default ({ store, redirect, route }) => {
  const guestState = store.state.guest;
  const { accessGranted } = guestState;
  const isQueue = route.name === 'index';
  const redirectToQueue = !accessGranted && !isQueue;

  if (redirectToQueue) {
    return redirect('/');
  }
};
