<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

const words = computed(() => props.text.split(' '))

</script>

<template>
  <div class="text">
    <span v-for="word in words" class="word">
      <span v-for="letter in word">
        {{ letter }}
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
</style>
