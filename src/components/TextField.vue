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

</script>

<template>
  <div class="text">
    <span v-for="word in displayWords" class="word">
      <span v-for="letter in word" :class="{
        letter: true,
        error: letter[1] && letter[1] !== letter[0],
        correct: letter[1] && letter[1] === letter[0]
      }">
        {{ letter[0] || letter[1] }}
      </span>
    </span>
  </div>
</template>

<style scoped>
.text {
  max-width: 300px;
  font-size: 1.3em;
  display: flex;
  flex-wrap: wrap;
}

.word {
  margin-right: 0.3em;
  color: #888;
}

.letter.correct {
  color: white;
}

.letter.error {
  color: rgb(236, 117, 117);
}
</style>
