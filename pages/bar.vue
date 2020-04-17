<template>
  <div class="bar">
    <h1>No Drinks. Only Donations.</h1>
    <article
      v-for="(service, index) in services"
      :key="index"
    >
      <div class="donation-header">
        <span class="donation--service">{{ service.name }}</span>
        <span class="donation--dots" />
        <span class="donation--link">
          <a
            :href="service.href"
            target="_blank"
            @click="trackExternalLink(service.name)"
          >↗Donate</a>
        </span>
      </div>
      <div class="donation-description">
        {{ service.description }}
      </div>
    </article>
    <div class="fullscreen-bg">
      <video loop muted autoplay playsinline class="fullscreen-bg__video">
        <source src="https://player.vimeo.com/external/401375408.hd.mp4?s=bbf37b1601af62db2a1758fd0d63b6f23c5f2623&profile_id=175" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data () {
    return {
      services: [
        {
          name: 'Berlin Collective Action: Nightlife Emergency Fund',
          href: 'https://www.betterplace.me/berlin-collective-action-nightlife-emergency-fund16',
          description: 'This fund exists to provide emergency financial aid to at-risk nightlife workers in Berlin — those whose livelihoods have been severely impacted by COVID-19, and especially those who do not have access to other support systems.'
        },
        {
          name: 'Global Citizen',
          href: 'https://www.globalcitizen.org/en/donate/',
          description: 'Fundraising for an organisation driving actions that will impact the lives of millions living in poverty around the world'
        },
        {
          name: 'Karada House',
          href: 'https://www.betterplace.me/emergency-relief-for-queers-und-womxn',
          description: 'This is an emergency relief fund for people of the LGBTQIA+ spectrum & womxn living in Berlin, Germany who are affected by the outbreak and shutdown caused by COVID-19.'
        },
        {
          name: 'Sea Watch ',
          href: 'https://sea-watch.org/spenden',
          description: 'Fundraising for an organisation that rescues refugees in the Mediterranean.'
        },
        {
          name: 'TS Raver',
          href: 'https://paypal.me/pools/c/8nKshvWZdC',
          description: 'Fundraising for Berlin based awareness collective providing club care.'
        },
        {
          name: 'Viva con Agua',
          href: 'https://www.vivaconagua.org/index.htm?spende',
          description: 'Fundraising for an organisation focussed on providing clean drinking water.'
        },
        {
          name: 'RA SaveOurScene petition and fundraising options',
          href: 'https://www.residentadvisor.net/features/3640',
          description: ''
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setFirstQuestion', true)
    this.$store.commit('setSecondQuestion', true)
    this.$store.commit('setThirdQuestion', true)
    this.$store.commit('setFourthQuestion', true)
    this.$gtag.pageview({ page_path: '/bar' })
  },
  methods: {
    trackExternalLink (name) {
      this.$gtag.event(name, {
        event_category: 'external_link',
        event_label: 'linkclick'
      })
    }
  }
}
</script>
