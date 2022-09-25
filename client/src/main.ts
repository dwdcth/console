import App from './App.vue'
import './styles/tailwind.css'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import router, { setupRouter } from './router'
import { AppProvider } from '@/components/Application'
import { setupNaive, setupDirectives } from '@/plugins'

async function bootstrap() {
  const appProvider = createApp(AppProvider)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app)

  // 挂载状态管理
  setupStore(app)

  //优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
  appProvider.mount('#appProvider', true)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app', true)
}

void bootstrap()
