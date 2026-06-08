// 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"
export const useCountDown = () => {
  // 1.响应式数据
  let timer = null
  const time = ref(0)
  // 格式化时间为xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2.倒计时逻辑函数
  const start = (currentTime) => {
    // 先清除上一次的定时器，防止内存泄漏
    if (timer) clearInterval(timer)
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}

