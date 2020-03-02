import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Posts from "@/components/Posts";
import NewPost from "@/components/NewPost";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import EditPost from "@/components/EditPost";
import LoginPage from "@/components/LoginPage";
import SignUp from "@/components/SignUp";
// import PostsUser from "@/components/PostsUser";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/posts', component: Posts },
    { path: '/posts/new', component: NewPost },
    { path: '/posts/:id', component: EditPost },
    { path: '/login', component: LoginPage },
    { path: '/sign-up', component: SignUp },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/sign-up', '/posts'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('logged');

  if (authRequired && !loggedIn) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }

  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');