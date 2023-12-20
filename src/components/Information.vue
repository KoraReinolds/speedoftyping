<script setup lang="ts">

defineProps<{ errors: number, speed: number }>()

</script>

<template>
  <div class="info">
    <div class="error">{{ errors }} errors</div>
    <div class="speed">{{ Math.round(speed * 60) || 0 }} chars/min</div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
}

.info .error,
.info .speed {
  margin-left: auto;
}

.info .error {
  color: rgb(236, 117, 117);
}
</style>
