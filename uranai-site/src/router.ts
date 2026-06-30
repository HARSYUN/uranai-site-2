import { createRouter, createWebHashHistory } from 'vue-router'

// views
import StartView from './views/StartView.vue'
import SignupView from './views/SignupView.vue'
import SignupEmailView from './views/SignupEmailView.vue'
import SignupCompleteView from './views/SignupCompleteView.vue'

import LoginView from './views/LoginView.vue'
import MainView from './views/MainView.vue'
import MyPageView from './views/MyPageView.vue'
import MainResultView from './views/MainResultView.vue'

const routes = [
  { path: '/', component: StartView }, 
  { path: '/signup', component: SignUpView },
  { path: '/signup_email', component: SignupEmailView },
  { path: '/signup_complete', component: SignupCompleteView },

  { path: '/login', component: LoginView }, 
  { path: '/main', component: MainView },
  { path: '/mypage', component: MyPageView },
  { path: '/main_result', component: MainResultView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



// ログインガード
const requiresAuth = ['/main', '/mypage', '/main_result']

router.beforeEach((to, _, next) => {
  const user = localStorage.getItem('user')

  //未ログインで保護ページ
  if (!user && requiresAuth.includes(to.path)) {
    return next('/login')
  }

  //ログイン済みでスタートorログイン画面に来たら
  if (user && (to.path === '/' || to.path === '/login')) {
    return next('/main')
  }

  return next()
})

export default router
