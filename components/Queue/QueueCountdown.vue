<template>
  <div>
    You are in line.
    <div>:{{ countdown }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 30
    };
  }
};
</script>
