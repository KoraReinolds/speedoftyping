<script setup lang="ts">
import { ref } from 'vue';
import TextField from './components/TextField.vue'
import Timer from './components/Timer.vue';
import useTimer from './composables/timer';
import Information from './components/Information.vue';

const { start, current, total, status } = useTimer(20)

function startTimer() {
  if (status.value === 'pending') {
    start()
  }
}

const errorCounter = ref(0)
const charCounter = ref(0)

function increaseError() {
  startTimer()
  errorCounter.value += 1
}

function increaseChar() {
  startTimer()
  charCounter.value += 1
}

</script>

<template>
  <div>
    <Information :speed="charCounter / ((total - current) / 1000)" :errors="errorCounter" />
    <Timer :current="current" :total="total" />
    <TextField :disabled="status === 'finish'" text="Vite + Vue Vite + Vue Vite + Vue Vite + VueVite + Vue"
      @char="increaseChar" @error="increaseError" />
  </div>
</template>

<style scoped></style>
