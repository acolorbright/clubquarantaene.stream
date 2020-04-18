const state = () => ({
  aspectRatio: '169',
  delay: 0,
  is360: true,
  isMoving: false,
  isMuted: false,
  isRunning: false,
  isSupported: true,
  // Latency setting: https://support.google.com/youtube/answer/7444635?hl=en&ref_topic=9257892
  latency: 'normal-latency', // low-latency, ultra-low-latency
  numberOfViewers: 0,
  orientation: {},
  resolution: 1440
});

const mutations = {};

export default {
  state,
  mutations
};
