const Home = () => import(/* webpackChunkName: "home" */'../components/Home.vue')

const Login = () => import(/* webpackChunkName: "login" */'../components/dynamic/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */'../components/dynamic/Register.vue')
const ReSetPwd = () => import(/* webpackChunkName: "resetpwd" */'../components/dynamic/ReSetPwd.vue')

Vue.use(VueRouter)

const routes = [
  { path:'/', redirect: '/home' },
  { path:'/home', component:Home },
  { path:'/login', component:Login },
  { path:'/register', component:Register },
  { path:'/resetpwd', component:ReSetPwd }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
