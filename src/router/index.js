import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * 动态路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/bookManagement',
    name: 'bookManagement',
    component: Layout,
    redirect: '/bookManagement/createBook',
    meta: { title: '图书管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'createBook',
        path: '/bookManagement/createBook',
        component: () => import('@/views/bookManagement/createBook/index'),
        meta: { title: '上传图书', icon: 'edit', roles: ['admin'] }
      },
      {
        name: 'editBook',
        path: '/bookManagement/editBook/:fileName',
        component: () => import('@/views/bookManagement/editBook/index'),
        hidden: true,
        meta: { title: '编辑图书', icon: 'edit', roles: ['admin'], activeMenu: '/bookManagement/bookList' }
      },
      {
        name: 'bookList',
        path: '/bookManagement/bookList',
        component: () => import('@/views/bookManagement/bookList/index'),
        meta: { title: '图书列表', icon: 'list', roles: ['editor', 'admin'] }
      }
    ]
  },
  {
    path: '/musicManagement',
    name: 'musicManagement',
    component: Layout,
    redirect: '/musicManagement/songSheetList',
    meta: { title: '音乐管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'createBook',
        path: '/musicManagement/songSheetList',
        component: () => import('@/views/musicManagement/songSheetList/index'),
        meta: { title: '歌单管理', icon: 'table', roles: ['admin'] }
      },
      {
        name: 'editSongSheet',
        path: '/musicManagement/editSongSheet/:fileName',
        component: () => import('@/views/musicManagement/editSongSheet/index'),
        hidden: true,
        meta: { title: '编辑歌单', icon: 'edit', roles: ['admin'], activeMenu: '/musicManagement/editSongSheet' }
      },
      {
        name: 'swiperList',
        path: '/musicManagement/swiperList',
        component: () => import('@/views/musicManagement/swiperList/index'),
        meta: { title: '轮播图管理', icon: 'table', roles: ['editor', 'admin'] }
      }
    ]
  },
  {
    path: '/blogManagement',
    name: 'blogManagement',
    component: Layout,
    redirect: '/blogManagement/blogList',
    meta: { title: '博客管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'blogList',
        path: '/blogManagement/blogList',
        component: () => import('@/views/blogManagement/blogList/index'),
        meta: { title: '博客列表', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }// 404 page must be placed at the end !!!
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
