<script setup lang="ts">
import { nextTick, ref } from 'vue';
import TextField from './components/TextField.vue'
import Timer from './components/Timer.vue';
import useTimer from './composables/timer';
import Information from './components/Information.vue';

const defaultTimer = 20
const { start, stop, current, total, status } = useTimer(defaultTimer)

function startTimer() {
  if (status.value === 'pending') {
    start()
  }
}

const errorCounter = ref(0)
const charCounter = ref(0)
const correctCharCounter = ref(0)
const lastText = 'Vite + agfds fdg sfgd Vue Vite'
const text = ref(lastText)

function increaseError() {
  errorCounter.value += 1
}

function increaseChar() {
  startTimer()
  charCounter.value += 1
}

function increaseCorrectChar() {
  correctCharCounter.value += 1
}

function again() {
  start()
  text.value = lastText
}

</script>

<template>
  <div>
    <Information :chars="correctCharCounter" :speed="charCounter / ((total - current) / 1000)" :errors="errorCounter" />
    <Timer :current="current" :total="total" />
    <TextField :disabled="status === 'finish'" :text="text" @end="stop" @correctChar="increaseCorrectChar"
      @char="increaseChar" @error="increaseError" />
  </div>
  <div class="actions" v-if="status === 'finish'">
    <button @click="again">Again</button>
    <button>Next</button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: end;
  margin-top: 12px;
}

.actions button {
  margin-left: 8px;
}
</style>
