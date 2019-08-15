<template>
  <button @click="$emit('btnClicked', $event)" @keyup.enter="$emit('btnClicked', $event)"
    :class="{ 'btn-reg': !inverted, 'btn-inverted': inverted }">
    <slot name="icon"></slot>
    {{ msg }}
  </button>
</template>

<script>
export default {
  
  props: {
    msg: String,
    inverted: Boolean
  }
  
}
</script>

<style scoped>
.btn-reg, .btn-inverted {
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  transition: background-color 0.2s;
  padding: 6px 12px;
  border: 1px solid transparent;
}

.btn-reg:hover, .btn-inverted:hover {
  cursor: pointer;
}

.btn-reg {
  background-color: #eeeeee;
  color: #232931;
}

.btn-reg:hover {
  background-color: #393e46;
  color: white;
  border: 1px solid #1e2022;
}

.btn-inverted {
  background-color: #232931;
  color: #eeeeee;
}

.btn-inverted:hover {
  background-color: white;
  color: #393e46;
  border: 1px solid #1e2022;
}
</style>