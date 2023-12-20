import { computed, ref } from "vue"

export default (initialTime: number) => {

  let frameId: number
  let timeOfStart: number
  const time = ref(0)

  const total = ref(initialTime * 1000)
  const current = computed(() => Math.max(0, total.value - time.value))

  function updateTime() {
    time.value = Math.max(0, Date.now() - timeOfStart)
    if (time.value > initialTime * 1000) stop()
    else frameId = requestAnimationFrame(updateTime)
  }

  function start() {
    timeOfStart = Date.now()
    updateTime()
  }

  function stop() {
    clearInterval(frameId)
  }

  return { start, stop, current, total }

}