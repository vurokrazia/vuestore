<template>
  <div>
    <auth-form
      action="login"
      v-on:process="login($event)"
      />
    <app-snack-bar
      v-if="snackBar"
      :snackBar="snackBar"
      :text="message"
      :timeout="timeout"
    />
  </div>  
</template>
<script>
  import AppSnackBar from '@/components/Snackbar';
  import AuthForm from '@/components/forms/Auth';
  import {db} from '@/main';
  export default {
    name: 'Login',
    components: {
      AppSnackBar,
      AuthForm
    },
    data () {
      return {
        snackBar: false,
        message: '',
        timeout: 5000
      }
    },
    methods: {
      login (user) {
        this.$store.dispatch('firebaseLogin', user)
        .then(data => {
          db.collection('users').doc(data.user.uid).onSnapshot(snapshot => {
            this.$router.push('/');
          })
        }).catch(console.log);
      }
    }
  }
</script>