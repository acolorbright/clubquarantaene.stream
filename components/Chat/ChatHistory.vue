<template>
  <ul ref="chat-history">
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="chat-history-message"
    >
      <span
        class="chat-history-indicator"
        :style="{ 'background-color': `${message.name}` }"
      />
      <span>
        {{ message.message }}
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ChatHistory',
  props: {
    messages: Array
  }
};
</script>
