<template>
  <div class="bathroom">
    <div class="bathroom-cubicles" v-if="cubicleDataArray">
      <div
        class="bathroom-cubicles-item"
        v-for="(cubicle, index) in cubicleDataArray"
        :key="index"
        :class="{
          occupied: cubicleDataArray[index] === 'full'
        }"
        @click="handleClick(index)"
      >
        <span>{{ index + 1 }}</span>
        <figure class="bathroom-cubicles-item-hoverimage">
          <img :src="bathroomImages[index]" />
        </figure>
        <figure class="background-image">
          <img src="~/assets/images/cubicle.png" />
        </figure>
      </div>
      <div class="bathroom-cubicles-item bathroom-cubicles-warning">
        Max. 8 People per Cubicle
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data() {
    return {
      roomName: 'toilets',
      cubicleDataArray: null
    };
  },
  computed: {
    bathroomImages() {
      return this.$store.state.content.bathroomImages;
    }
  },
  methods: {
    handleClick(index) {
      this.$router.push({ path: `/bathroom/${index + 1}` });
    }
  },
  beforeMount() {
    this.$socket.client.emit('getCubiclesStatus');
    this.$socket.client.emit(
      'new-user',
      this.roomName,
      this.$store.state.guest.color
    );
  },
  mounted() {
    this.$gtag.pageview({ page_path: '/bathroom' });
  },
  beforeDestroy() {
    this.$socket.client.emit('user-leave', this.roomName);
  },
  sockets: {
    cubicleStatus(cubicleDataArray) {
      this.cubicleDataArray = cubicleDataArray;
    }
  }
};
</script>
