// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '@/config/firebase';
import i18n from '@/config/i18n';
import store from '@/store/index.js';
import vSelect from 'vue-select'
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
require('./config/vuetify');
Vue.component('v-select', vSelect)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid).onSnapshot(snapshot => {
          store.commit('setUser', user);
          if (snapshot.exists) {
            this.$store.commit('setRole', snapshot.data().role);
          }
          store.commit('setLoaded',true);
        })
      } else {
        store.commit('setLoaded',true);
      }
    });
  }
})
