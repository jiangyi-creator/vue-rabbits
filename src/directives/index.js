// 定义懒加载插件

// 引入vueUse中的方法判断图片是否进入视口
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install(app) {
    // 懒加载插件逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令绑定的元素 img
        // binding: binding.value 指令表达式等于号后面表达式的值 url
        console.log(el, binding.value)
        const {stop} = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if(isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}
