<template>
  <div>
    Sorry, not today.

    <button @click="tryAgain">Try again</button>
  </div>
</template>

<script>
export default {
  methods: {
    tryAgain() {
      alert('try again');
    }
  }
};
</script>
