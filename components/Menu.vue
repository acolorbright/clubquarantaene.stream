<template>
  <nav>
    <!-- THIS WAS THE MENU AFTER THE EVENT WAS OVER
    <div class="left-menu">
      <nuxt-link to="/" v-if="$store.state.eventIsOver">Home</nuxt-link>
      <nuxt-link to="/cloakroom">Cloakroom</nuxt-link>
      <nuxt-link to="/bar">Bar</nuxt-link>
    </div>
    -->
    <div class="left-menu">
      <span class="live-icon">&#xE000;</span>
      {{
        $store.state.oldState.users
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }}
      guest<span v-if="$store.state.oldState.users > 1">s</span>
    </div>
    <div class="right-menu">
      <nuxt-link to="/mainfloor">
        Dancefloor
      </nuxt-link>
      <nuxt-link to="/cloakroom">
        Cloakroom
      </nuxt-link>
      <nuxt-link to="/bar">
        Bar
      </nuxt-link>
      <nuxt-link to="/bathroom">
        Bathroom
      </nuxt-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Menu'
};
</script>
