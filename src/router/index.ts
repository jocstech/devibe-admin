import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/cms',
    name: 'Root',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirects',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {},
      },
    ],
    meta: {
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true,
    },
  },
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  // CMS 内容管理系统
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/articles',
    name: 'CMS',
    meta: {
      title: t('router.cms'),
      icon: 'ant-design:unordered-list-outlined',
      alwaysShow: true,
    },
    children: [
      {
        path: 'articles',
        component: () => import('@/views/CMS/Articles.vue'),
        name: 'Articles',
        meta: {
          icon: 'ant-design:file-text-filled',
          title: t('router.articles'),
          noCache: true,
        },
      },
      {
        path: 'articles/:id',
        component: () => import('@/views/CMS/ArticleEdit.vue'),
        name: 'ArticleEdit',
        meta: {
          title: t('router.article_edit'),
          hidden: true,
          noCache: true,
        },
      },
      {
        path: 'tags',
        component: () => import('@/views/CMS/Tags.vue'),
        name: 'Tags',
        meta: {
          icon: 'ant-design:tag-filled',
          title: t('router.tags'),
          noCache: true,
        },
      },
      {
        path: 'tags/:id',
        component: () => import('@/views/CMS/TagEdit.vue'),
        name: 'TagEdit',
        meta: {
          title: t('router.tags'),
          hidden: true,
        },
      },
    ],
  },
  // SYSTEM 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/users',
    name: 'System',
    meta: {
      title: t('system.title'),
      icon: 'ant-design:tool-outlined',
      alwaysShow: true,
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/System/Users.vue'),
        name: 'Users',
        meta: {
          title: t('system.users'),
          icon: 'ant-design:user-outlined',
        },
      },
      {
        path: 'roles',
        component: () => import('@/views/System/Roles.vue'),
        name: 'Roles',
        meta: {
          title: t('system.roles'),
          icon: 'ant-design:solution-outlined',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string))
      router.hasRoute(name) && router.removeRoute(name)
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
