const state = () => ({
  buttons: [
    {
      label: 'Label',
      reaction: 'some-string',
      progress: 0,
      currentClicks: 0,
      maxClickAmount: 100
    },
    {
      label: 'Second button',
      reaction: 'some-other-string',
      progress: 0,
      currentClicks: 0,
      maxClickAmount: 100
    }
  ]
});

const mutations = {};

export default {
  state,
  mutations
};
