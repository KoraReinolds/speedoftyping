<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import TextField from './components/TextField.vue'
import Timer from './components/Timer.vue';
import useTimer from './composables/timer';
import Information from './components/Information.vue';

const { reset, start, stop, current, total, status } = useTimer(20)

function startTimer() {
  if (status.value === 'pending') {
    start()
  }
}

const errorCounter = ref(0)
const charCounter = ref(0)
const correctCharCounter = ref(0)
const lastText = ref('')
const text = ref(lastText.value)

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

function resetAll() {
  reset()
  errorCounter.value = 0
  charCounter.value = 0
  correctCharCounter.value = 0
  text.value = lastText.value
}

function getRandomQuote() {

  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp`

  const script = document.createElement('script')

  const callbackFunctionName = 'jsonpCallback_' + Math.round(100000 * Math.random());

  (window as any)[callbackFunctionName] = (data: any) => {
    if (data?.quoteText) {
      lastText.value = data.quoteText.trim()
      resetAll()
    }
    document.body.removeChild(script)
    delete (window as any)[callbackFunctionName]
  }

  const urlWithCallback = `${apiUrl}&jsonp=${callbackFunctionName}`

  script.src = urlWithCallback

  document.body.appendChild(script)
}

getRandomQuote()

function handleKeyUp(e: KeyboardEvent) {
  if (status.value === 'finish') {
    if (e.code === 'KeyA') resetAll()
    else if (e.code === 'KeyN') getRandomQuote()
  }
}

document.body.addEventListener('keyup', handleKeyUp)

onUnmounted(stop)
onUnmounted(() => document.body.removeEventListener('keyup', handleKeyUp))

</script>

<template>
  <div>
    <Information :chars="correctCharCounter" :speed="charCounter / ((total - current) / 1000)" :errors="errorCounter" />
    <Timer :current="current" :total="total" />
    <TextField :disabled="status === 'finish'" :text="text" @end="stop" @correctChar="increaseCorrectChar"
      @char="increaseChar" @error="increaseError" />
  </div>
  <div class="actions" v-if="status === 'finish'">
    <button @click="resetAll">A - Again</button>
    <button @click="getRandomQuote">N - Next</button>
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
