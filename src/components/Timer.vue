<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  total: number
  current: number
}>()

function formatTime(time: number) {
  return [
    Math.floor(time / 1000 % 60) || 0,
    Math.floor(time / 1000 / 60) || 0
  ]
}

const formatedRestTime = computed(() => formatTime(props.current))
const widthOfTimer = computed(() => props.current / (props.total) * 100)

</script>

<template>
  <div class="info" v-if="current">
    <span v-if="formatedRestTime[1]">{{ formatedRestTime[1] }} min</span>
    <span v-if="formatedRestTime[0]" class="second">{{ formatedRestTime[0] }} sec</span>
  </div>
  <div class="timer" :style="{ width: `${widthOfTimer}%` }">
  </div>
</template>

<style scoped>
.timer {
  height: 1px;
  background-color: #dbe128;
  margin-left: auto;
}

.info {
  text-align: right;
  margin-left: auto;
  margin-bottom: 4px;
}

.info .second {
  margin-left: 4px;
}
</style>
