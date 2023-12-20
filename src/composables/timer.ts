import { computed, ref } from "vue"
type Status = 'pending' | 'progress' | 'finish'

export default (initialTime: number) => {

  const frameId = ref()
  let timeOfStart: number
  const time = ref(0)
  const status = ref<Status>('pending')

  const total = ref(initialTime * 1000)
  const current = computed(() => Math.max(0, total.value - time.value))

  function updateTime() {
    time.value = Math.max(0, Date.now() - timeOfStart)
    if (time.value > initialTime * 1000) stop()
    else frameId.value = requestAnimationFrame(updateTime)
  }

  function start() {
    status.value = 'progress'
    timeOfStart = Date.now()
    updateTime()
  }

  function stop() {
    status.value = 'finish'
    cancelAnimationFrame(frameId.value)
    frameId.value = null
  }

  return { start, stop, current, total, status }

}