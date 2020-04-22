<template>
  <div class="app">
    {{ $store.state.event.content }}
    <nav>menu</nav>
    <main>
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </main>
    <footer>footer</footer>
  </div>
</template>

<script>
// import vhCheck from 'vh-check';
// import Header from '~/components/Header';
// import Footer from '~/components/Footer';

export default {
  // components: {
  //   Header,
  //   Footer
  // },
  mounted() {
    // vhCheck({
    //   cssVarName: 'vh-offset'
    // });

    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 750);
    });
  },
  middleware: ['fetchContent']
};
</script>
