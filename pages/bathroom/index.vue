<template>
  <div class="bathroom">
    <div v-if="cubicleDataArray" class="bathroom-cubicles">
      <div
        v-for="(cubicle, index) in cubicleDataArray"
        :key="index"
        class="bathroom-cubicles-item"
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
        <span class="button">
          Max. 8 People per Cubicle
        </span>
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
    },
    userData() {
      return this.$store.state.guest.userData;
    }
  },
  beforeMount() {
    this.$socket.client.emit('getCubiclesStatus');
    this.$socket.client.emit('new-user', {
      room: this.roomName,
      uuid: this.userData.uuid,
      name: this.userData.userName
    });
  },
  mounted() {
    this.$gtag.pageview({ page_path: '/bathroom' });
  },
  beforeDestroy() {
    this.$socket.client.emit('user-leave', this.roomName);
  },
  methods: {
    handleClick(index) {
      this.$router.push({ path: `/bathroom/${index + 1}` });
    }
  },
  sockets: {
    cubicleStatus(cubicleDataArray) {
      this.cubicleDataArray = cubicleDataArray;
    }
  }
};
</script>
