<script setup lang="ts">

defineProps<{ errors: number, speed: number, chars: number }>()

</script>

<template>
  <div class="info">
    <div class="error">{{ errors }} errors</div>
    <div class="char">{{ chars }} chars</div>
    <div class="speed">{{ Math.round(speed * 60) || 0 }} chars/min</div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
}

.info div {
  margin-left: auto;
}

.info .error {
  color: rgb(236, 117, 117);
}
</style>
