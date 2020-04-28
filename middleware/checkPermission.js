export default ({ store, redirect, route }) => {
  const isAllowed = route.name === 'index' || route.name === 'imprint';
  if (!isAllowed) {
    return redirect('/');
  }

  const isDev = process.env.isDev;

  const guestState = store.state.guest;
  const { accessGranted } = guestState;
  const isQueue = route.name === 'index';
  const shouldRedirectToQueue = !accessGranted && !isQueue;

  const { personalinvitationfrom } = route.query;
  const isInvited =
    personalinvitationfrom && personalinvitationfrom === 'clubquarantaene';

  if (isInvited && isQueue && !accessGranted) {
    setTimeout(() => {
      alert(
        'Hey friend of clubquarantäne, thank you for following our invitation. Have fun! <3'
      );
    }, 3000);
  }

  if (shouldRedirectToQueue && !isDev && !isAllowed) {
    return redirect('/');
  }
};
