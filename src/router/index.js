import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import CreateBlog from '@/views/Allblogs/CreateBlog.vue'
import BlogDetails from '@/views/Allblogs/BlogDetails.vue'
import UserBlog from '@/views/Allblogs/UserBlog.vue'

//route
import { projectAuth } from '@/firebase/config'
let user = projectAuth.currentUser
const requireAuth = (to, from, next)=> {
  if(!user){
    next({ name:'login'})
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // beforeEnter:requireAuth
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/signup',
    name:'signup',
    component:Signup
  },
  {
    path:'/blog/create',
    name:'CreateBlog',
    component:CreateBlog,
    // beforeEnter:requireAuth
  },
  {
    path:'/blog/:id',
    name:'BlogDetails',
    component:BlogDetails,
    props:true
  },
  {
    path:'/blog/user',
    name:'UserBlog',
    component:UserBlog
  },
  {
    path:'/bloglists/user',
    name:'UserBlog',
    component:UserBlog,
    // beforeEnter:requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
