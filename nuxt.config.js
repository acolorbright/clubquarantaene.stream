export default {
  mode: 'spa',
  server: {
    host: '0.0.0.0'
  },
  env: {
    isDev: process.env.NODE_ENV !== 'production',
    afterPartyId: process.env.YOUTUBE_VIDEO_ID_ENDED,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CMS_URL: process.env.CMS_URL,
    SOCKET_URL: process.env.SOCKET_URL,
    startEventDate: '06-12-2020 21:59 PM',
    endEventDate: '06-14-2020 14:59 AM',
    closedEventDate: '06-14-2020 16:59 AM',
    YOUTUBE_VIDEO_ID: 'bZeZ9KD4RvQ',
    YOUTUBE_VIDEO_ID_ENDED: 'grhFTe071VA'
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
        content: `https://clubquarantaene.stream/og_image.jpg`
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
        content: `https://clubquarantaene.stream/og_image.jpg`
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
        src:
          'https://storage.googleapis.com/off-world-live-client/0.0.8/offworldPerformance.min.js'
      }
    ]
  },
  loading: {
    color: '#fff'
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
