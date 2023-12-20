<script setup lang="ts">
import { computed, ref } from 'vue';


const props = defineProps<{ text: string }>()
const inputText = ref('vates')

const parseText = (text: string) => {
  return text
    .split(' ')
    .map(word => word.split(''))
}

const words = computed(() => parseText(props.text))

const displayWords = computed(() => {
  const parsedInputText = parseText(inputText.value)

  return words.value.map((word, wordIndex) => {
    const inputWord = parsedInputText[wordIndex]
    const displayWord = inputWord || word
    return displayWord.map(
      (_, letterIndex) => [
        word?.[letterIndex],
        inputWord?.[letterIndex],
      ]
    )
  })
})

const cursor = ref({
  wordIndex: 0,
  letterIndex: 1,
})

</script>

<template>
  <div class="text">
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
  </div>
</template>

<style scoped>
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

.letter.cursor::before {
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
