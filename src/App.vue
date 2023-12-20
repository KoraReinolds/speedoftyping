<script setup lang="ts">
import { ref } from 'vue';
import TextField from './components/TextField.vue'
import Timer from './components/Timer.vue';
import useTimer from './composables/timer';
import Information from './components/Information.vue';

const { start, current, total } = useTimer(20)

start()

const errorCounter = ref(0)
const charCounter = ref(0)

</script>

<template>
  <div>
    <Information :chars="charCounter" :errors="errorCounter" />
    <Timer :current="current" :total="total" />
    <TextField text="Vite + Vue Vite + Vue Vite + Vue Vite + VueVite + Vue" @char="charCounter += 1"
      @error="errorCounter += 1" />
  </div>
</template>

<style scoped></style>
