import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User.vue')
    },
    {
      path: '/productList',
      name: 'productList',
      component: () => import('@/views/ProductList.vue')
    },
    {
      path: '/productDetail/:id',
      name: 'product',
      component: () => import('@/views/ProductDetail.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/Community.vue')
    },
    {
      path: '/articleDetail/:id',
      name: 'article',
      component: () => import('@/views/ArticleDetail.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order.vue')
    },
    {
      path: '/createOrder',
      name: 'createOrder',
      component: () => import('@/views/CreateOrder.vue')
    }
  ]
})

export default router
