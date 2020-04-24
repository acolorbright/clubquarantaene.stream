<template>
  <transition-group class="chat-history" name="list-complete" tag="ul">
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="list-complete-item chat-message-box chat-history-iteam"
    >
      <span
        class="chat-history-indicator"
        :style="{ 'background-color': `${message.name}` }"
      />
      <span>
        {{ message.message }}
      </span>
    </li>
  </transition-group>
</template>
<script>
export default {
  name: 'ChatHistory',
  props: {
    messages: Array
  }
};
</script>
