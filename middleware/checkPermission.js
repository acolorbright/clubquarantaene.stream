export default ({ store, redirect, route }) => {
  const isDebugMode = process.env.isDebugMode;
  const isProtectedRoute = route.name !== 'index' && route.name !== 'imprint';

  const guestState = store.state.guest;
  const { accessGranted } = guestState;
  const isQueue = route.name === 'index';
  const shouldRedirectToQueue = !accessGranted && !isQueue;

  if (shouldRedirectToQueue && isProtectedRoute && !isDebugMode) {
    return redirect('/');
  }
};
