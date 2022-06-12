import type { RouteRecordRaw } from 'vue-router'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { PageEnum } from '@/enums/pageEnum'
import { ErrorPageRoute } from '@/router/base'

const LOGIN_PATH = PageEnum.BASE_LOGIN

// const whitePathList = [LOGIN_PATH]

/**
 * 创建路由守卫
 * @param router
 */
export function createRouterGuards(router: Router) {
  const userStore = useUserStoreWidthOut()
  const asyncRouteStore = useAsyncRouteStoreWidthOut()
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null
    Loading && Loading.start()
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME)
      return
    }

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const userInfo = await userStore.GetInfo()

    const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw)
    })

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }
    asyncRouteStore.setDynamicAddedRoute(true)
    next({
      path: to.path,
      query: to.query
    })
    Loading && Loading.finish()
  })

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title
    // if (isNavigationFailure(failure)) {
    //   console.log('failed navigation', failure)
    // }
    // const asyncRouteStore = useAsyncRouteStoreWidthOut()
    // // 在这里设置需要缓存的组件名称
    // const keepAliveComponents = asyncRouteStore.keepAliveComponents
    // const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
    // if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
    //   // 需要缓存的组件
    //   keepAliveComponents.push(currentComName)
    // } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
    //   // 不需要缓存的组件
    //   const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName)
    //   if (index != -1) {
    //     keepAliveComponents.splice(index, 1)
    //   }
    // }
    // asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
    const Loading = window['$loading'] || null
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
