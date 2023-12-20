<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{ text: string }>()
const inputText = ref('')
const errorCounter = ref(0)
const charCounter = ref(0)

const parseText = (text: string) => {
  return text
    .split(' ')
    .map(word => word.split(''))
}

const words = computed(() => parseText(props.text))
const inputWords = computed(() => parseText(inputText.value))

const displayWords = computed(() => {

  return words.value.map((word, wordIndex) => {
    const inputWord = inputWords.value[wordIndex]
    const displayWord = (inputWord && inputWord.length > word.length)
      ? [...inputWord]
      : [...word]
    displayWord.push(' ') // space
    return displayWord.map(
      (_, letterIndex) => [
        word?.[letterIndex],
        inputWord?.[letterIndex],
      ]
    )
  })
})

type Cursor = {
  wordIndex: number
  letterIndex: number
}

const cursor = computed<Cursor>(() => ({
  wordIndex: inputWords.value.length - 1,
  letterIndex: inputWords.value.at(-1)?.length || 0,
}))

function isEraseLetter(newCursor: Cursor, oldCursor: Cursor) {
  return (newCursor.letterIndex < oldCursor.letterIndex)
    || (newCursor.wordIndex < oldCursor.wordIndex)
}

watch(cursor, (newValue, oldValue) => {

  if (isEraseLetter(newValue, oldValue)) return

  const { wordIndex, letterIndex } = oldValue
  const [first, second] = displayWords.value[wordIndex][letterIndex]

  if (first !== second) errorCounter.value += 1
  charCounter.value += 1

})

const setCursorToEnd = (e) => {
  e.target?.setSelectionRange(inputText.value.length, inputText.value.length)
}

</script>

<template>
  <div class="info">
    <div class="error">{{ errorCounter }} errors</div>
    <div class="speed">{{ charCounter }} chars</div>
  </div>

  <input autofocus id="text" type="text" v-model="inputText" @keydown="setCursorToEnd">
  <label for="text" class="text">
    <span v-for="(word, wordIndex) in displayWords" class="word">
      <span v-for="(letter, letterIndex) in word" :class="{
        letter: true,
        error: letter[1] && letter[1] !== letter[0],
        correct: letter[1] && letter[1] === letter[0],
        cursor: cursor.wordIndex === wordIndex && cursor.letterIndex === letterIndex
      }">
        {{ letter[0] || letter[1] }}
      </span>
    </span>
  </label>
</template>

<style scoped>
#text {
  height: 0;
  width: 0;
  border: 0;
  background: transparent;
  padding: 0;
}

.text {
  max-width: 800px;
  font-size: 1.8em;
  display: flex;
  flex-wrap: wrap;
}

.word {
  margin-right: 0.5em;
  color: #888;
}

.letter {
  margin-right: 0.05em;
}

.letter.correct {
  color: white;
}

.letter.error {
  color: rgb(236, 117, 117);
  position: relative;
}

#text:focus+.text .letter.cursor::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 1em;
  background-color: #dbe128;
  transform: translate(-1px, 0.2em);
  animation: fadeInOut 1.5s infinite alternate;
}

@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

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
