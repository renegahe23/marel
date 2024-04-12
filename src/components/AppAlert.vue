
<template>
  <div v-if="message" class="alert" :class="`alert-${type}`">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'success' // 'success', 'error', etc.
    }
  }
}
</script>

<style>
.alert {
  padding: 20px;
  color: white;
  margin-bottom: 15px;
}
.alert-success {
  background-color: #4CAF50;
}
.alert-error {
  background-color: #f44336;
}
</style>