import Vue from 'vue'
import router from "./router"
import App from "./App.vue"
import * as firebase from "firebase";
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)

var firebaseConfig = {
  apiKey: "AIzaSyAmAWB-3woZ5EdcWGlBw55TSc335d_z6Z4",
  authDomain: "musfind-auth.firebaseapp.com",
  databaseURL: "https://musfind-auth.firebaseio.com",
  projectId: "musfind-auth",
  storageBucket: "musfind-auth.appspot.com",
  messagingSenderId: "368005345431",
  appId: "1:368005345431:web:c1c4f49ac9ccd8a9b439d2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
