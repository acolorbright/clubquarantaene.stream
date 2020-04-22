<template>
  <nav class="menu">
    <nuxt-link class="menu-live" to="/">
      <span class="menu-live-icon">Live</span>
      <span class="menu-live-counter">0 Guests</span>
    </nuxt-link>

    <ul class="menu-list">
      <li class="menu-list-item">
        <nuxt-link to="/bar">Bar</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/mainfloor">Mainfloor</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/cloakroom">Cloakroom</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/bathroom">Bathroom</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link to="/timetable">Timetable</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
