export default {
  mode: 'spa',
  server: {
    host: '0.0.0.0'
  },
  env: {
    isDev: process.env.NODE_ENV !== 'production',
    frontendUrl: 'https://clubquarantaene.stream',
    cmsUrl: 'https://cms.clubquarantaene.stream',
    socketUrl: 'https://socket.clubquarantaene.stream',
    startEventDate: '06-26-2020 22:00 PM',
    endEventDate: '06-28-2020 11:30 AM',
    youtubeVideoId: 'Iygrehyufjk',
    youtubeVideoIdEnded: 'grhFTe071VA',
    youtubeVideoIdDev: 'rG4jSz_2HDY',
    googleAnalyticsId: 'UA-161932716-1',
    isDebugMode: false
  },
  head: {
    title: 'CLUB QUARANTÄNE',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        name: 'http-equiv',
        content: 'no-cache, must-revalidate, post-check=0, pre-check=0'
      },
      {
        name: 'cache-control',
        content: 'max-age=0'
      },
      {
        name: 'expires',
        content: '0'
      },
      {
        name: 'expires',
        content: 'Tue, 01 Jan 1980 1:00:00 GMT'
      },
      {
        name: 'pragma',
        content: 'no-cache'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Club Quarantäne'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: `https://clubquarantaene.stream/`
      },
      {
        property: 'og:title',
        content: 'CLUB QUARANTÄNE'
      },
      {
        property: 'og:description',
        content: ''
      },
      {
        property: 'og:image',
        content: `https://clubquarantaene.stream/og_image.png`
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:url',
        content: `https://clubquarantaene.stream/`
      },
      {
        property: 'twitter:title',
        content: 'CLUB QUARANTÄNE'
      },
      {
        property: 'twitter:description',
        content: ''
      },
      {
        property: 'twitter:image',
        content: `https://clubquarantaene.stream/og_image.png`
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }],
    script: [
      {
        src: 'https://www.youtube.com/iframe_api'
      },
      {
        src: '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
      },
      {
        src: 'https://code.offworld.live/v0.1.5/offWorldLiveStreamClient.js'
      }
    ]
  },
  loading: {
    color: '#FF00C8'
  },
  css: ['@/assets/scss/main.scss'],
  plugins: [
    {
      src: '~/plugins/vue-gtag.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-socket.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-form-wizard.js',
      mode: 'client'
    }
  ],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/moment'],
  moment: {
    defaultTimezone: 'Europe/Berlin'
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', '@nuxtjs/device'],
  axios: {},
  build: {
    extend(config, ctx) {}
  }
};
