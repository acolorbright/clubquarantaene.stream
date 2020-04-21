<template>
  <div>
    <h3 class="step-title">Okay, enjoy and pick your color.</h3>
    <input type="text" />

    <div class="step-buttons-btn">
      <button class="step-buttons" @click="enterClub">Enter club</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    enterClub() {
      alert('enter club');
    }
  }
};
</script>
