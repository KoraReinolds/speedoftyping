<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
type Cursor = {
  wordIndex: number
  letterIndex: number
}

const props = defineProps<{ text: string, disabled: boolean }>()
const emits = defineEmits<{
  error: []
  char: []
  correctChar: []
  end: []
}>()

const inputText = ref('')
const inputEl = ref()

const parseText = (text: string) => {
  return text
    .split(' ')
    .map(word => word.split(''))
}

const words = computed(() => parseText(props.text))
const lastCursor = computed(() => getCursorFromParsedText(words.value))
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

function getCursorFromParsedText(text: string[][]) {
  return {
    wordIndex: text.length - 1,
    letterIndex: text.at(-1)?.length || 0,
  }
}

const cursor = computed<Cursor>(() => getCursorFromParsedText(inputWords.value))

function compareCursor(first: Cursor, second: Cursor) {
  if (first.wordIndex < second.wordIndex) return -1
  if (first.wordIndex > second.wordIndex) return 1
  if (first.letterIndex < second.letterIndex) return -1
  if (first.letterIndex > second.letterIndex) return 1
  return 0
}

watch(() => props.disabled, (value) => {
  if (!value) {
    inputText.value = ''
    if (inputEl.value instanceof HTMLInputElement) {
      nextTick(() => inputEl.value.focus())
    }
  }
})

watch(cursor, (newValue, oldValue) => {

  if (compareCursor(newValue, lastCursor.value) > -1) emits('end')

  if (compareCursor(newValue, oldValue) < 1) return

  const { wordIndex, letterIndex } = oldValue
  const [first, second] = displayWords.value[wordIndex][letterIndex]

  if (first !== second) emits('error')
  else emits('correctChar')
  emits('char')

})

function setCursorToEnd(input: HTMLInputElement) {
  input.setSelectionRange(inputText.value.length, inputText.value.length)
}

function extraLimit() {
  const curentWord = words.value[cursor.value.wordIndex]
  const inputWord = displayWords.value[cursor.value.wordIndex]

  return inputWord?.length - curentWord?.length > 3
}

function isFirstLetter() {
  return cursor.value.letterIndex === 0
}

function validateInput(e: KeyboardEvent) {
  if ((e.code !== 'Backspace' && e.code !== 'Space' && extraLimit())
    || (e.code === 'Space' && isFirstLetter())) {
    e.preventDefault()
  }
  if (e.target && e.target instanceof HTMLInputElement) {
    setCursorToEnd(e.target)
  }
}

</script>

<template>
  <input ref="inputEl" :disabled="disabled" autofocus id="text" type="text" v-model="inputText" @keydown="validateInput">
  <label for="text" class="text">
    <span v-for="(word, wordIndex) in displayWords" class="word">
      <span v-for="(letter, letterIndex) in word" :class="{
        letter: true,
        error: letter[1] && letter[1] !== letter[0],
        correct: letter[1] && letter[1] === letter[0],
        extra: !letter[0] && letter[1],
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
}

.letter.extra {
  color: rgb(145, 74, 74);
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
</style>
