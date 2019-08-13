<template>
  <button @click="$emit('btnClicked')">
    <slot name="icon"></slot>
    {{ msg }}
  </button>
</template>

<script>
export default {
  
  props: {
    msg: String
  }
  
}
</script>

<style scoped>
button {
  font-size: 16px;
  border-radius: 4px;
  background-color: #eeeeee;
  color: #232931;
  outline: none;
  transition: background-color 0.2s;
  padding: 6px 12px;
  border: none;
}

button:hover {
  cursor: pointer;
  background-color: #393e46;
  color: white;
  border: 1px solid #1e2022;
}
</style>