export default ({ store, redirect, route }) => {
  const isDev = process.env.isDev;
  const guestState = store.state.guest;
  const { accessGranted } = guestState;
  const isQueue = route.name === 'index';
  const redirectToQueue = !accessGranted && !isQueue;

  const { personalinvitationfrom } = route.query;
  const isInvited =
    personalinvitationfrom && personalinvitationfrom === 'ungroup';

  if (isInvited && isQueue && !accessGranted) {
    setTimeout(() => {
      alert('Hey friend! Thx for following our invitation. Have fun <3');
    }, 4000);
  }

  if (redirectToQueue && !isDev) {
    return redirect('/');
  }
};
