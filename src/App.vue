<template>
  <v-app>
    <v-content v-if="$store.state.loaded">
      <admin-navigation v-if="role === 'admin'"/>
      <guest-navigation v-if="role === 'guest'"/>
      <v-container class="mt-3 mb-3">
        <v-alert
          :type="$store.state.alert.type"
          :value="$store.state.alert.show"
        >
          {{ $store.state.alert.message }}
        </v-alert>
        <router-view/>
      </v-container>
      <app-footer/>
    </v-content>
    <v-container v-else fill-height>
      <v-layout flex align-center justify-center>
        <v-progress-circular indeterminate :size="100" :width="10" color="purple" />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import GuestNavigation from '@/navigations/guest';
  import AdminNavigation from '@/navigations/admin';
  import AppFooter from '@/components/Footer';
  import {mapGetters} from 'vuex';
  export default {
    name: 'App',
    components: {
      GuestNavigation,
      AdminNavigation,
      AppFooter
    },
    computed:{
      ...mapGetters(['role'])
    }
  }
</script>



