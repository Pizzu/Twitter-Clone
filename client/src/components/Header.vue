<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <router-link to="/" tag="a" class="navbar-brand text-primary">Twitter Clone <i class="fab fa-twitter"></i></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <div class="nav-item" v-if="getIsLoggedIn">
            <button @click="logout" class="btn btn-outline-primary">Logout</button>
        </div>
        <template v-else>
          <div class="nav-item">
            <router-link to="/login" tag="button" class="btn btn-outline-primary mr-3">Login</router-link>
           </div>
          <div class="nav-item">
           <router-link to="/signup" tag="button" class="btn btn-outline-primary">Signup</router-link>
           </div>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', ['getIsLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

<style scoped>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
</style>
