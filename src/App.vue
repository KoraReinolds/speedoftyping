<script setup lang="ts">
import TextField from './components/TextField.vue'
import Timer from './components/Timer.vue';
import useTimer from './composables/timer';

const { start, current, total } = useTimer(20)

start()

</script>

<template>
  <div>
    <Timer :current="current" :total="total" />
    <TextField text="Vite + Vue Vite + Vue Vite + Vue Vite + VueVite + Vue" />
  </div>
</template>

<style scoped></style>
