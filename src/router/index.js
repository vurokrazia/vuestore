import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/forms/Register'
import Login from '@/components/forms/Login'
import AdminHome from '@/components/Administration/AdminHome'
import AdminUsers from '@/components/Administration/AdminUsers'

Vue.use(Router)

import store from '@/store';
const beforeEnter = (to, from, next) => {
  if (store.state.authModule.logged){
    next({path: '/'})
  } else {
    next();
  }
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { Auth: false, title: 'Inicio'}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { Auth: false, title: 'Registro'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { Auth: false, title: 'Iniciar Sesión'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome,
      meta: { Auth: true, title: 'Administración', role:'admin'},
      children: [
        {
          path: 'users',
          component: AdminUsers,
          meta: { title: 'Administrar Usuarios'}
        }
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged && store.state.loaded) {
    next({path: '/login'});
  } else {
    if (to.meta.role) {
      if (store.state.loaded && (to.meta.role !== store.state.authModule.role)) {
        next({path: '/'});
        return;
      }
    }
    next();
  }
});

export default router;