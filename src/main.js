import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入vueUse中的方法判断图片是否进入视口
import { useIntersectionObserver } from '@vueuse/core'

import App from './App.vue'
import router from './router'
// 引入初始化样式文件
import '@/styles/common.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令
app.directive('img-lazy', {
  mounted(el, binding) {
    // el: 指令绑定的元素 img
    // binding: binding.value 指令表达式等于号后面表达式的值 url
    console.log(el, binding.value)
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        console.log(isIntersecting)
        if(isIntersecting) {
          el.src = binding.value
        }
      },
    )
  }
})
