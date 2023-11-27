// Composables
import { createRouter, createWebHistory } from 'vue-router'
import userCreateView from "@/views/UserCreateView.vue";
import userEditView from "@/views/UserEditView.vue";
import userView from "@/views/UserView.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: userView
      },
      {
        path: '/user/create',
        name: 'userCreate',
        component: userCreateView
      },
      {
        path: '/user/:id/edit',
        name: 'userEdit',
        component: userEditView
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
