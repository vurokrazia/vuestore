<template>
    <div>
      <auth-form
        action="register"
        v-on:process="register($event)"
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
      name: 'Register',
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
        register (user) {
          this.$store.dispatch('firebaseRegister', user)
            .then((userRegistered) => {
              const data = {
                uid: userRegistered.user.uid,
                email: user.email,
                role: 'customer'
              };
              db.collection('users').doc(userRegistered.user.uid).set(data).then(() => {
                this.$store.commit('setRole',data.role);
                this.$router.push('/');
              })
            }).catch((error) => {
              console.log(error);
              this.message = error.message.substr(0,60);
              this.snackBar = true;
              setTimeout(() => {
                this.snackBar = false;
              }, this.timeout)
          })
        }
      }
    }
</script>