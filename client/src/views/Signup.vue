<template>
  <section class="main">
    <div class="container h-100">
      <div class="row h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-1 text-light text-center my-5">Signup</h1>
        <div class="col-6">
          <div v-if="getErrorMessage" class="alert alert-color text-center" role="alert">
            {{ getErrorMessage }}
          </div>
          <form @submit.prevent="onSignup(user)" class="border border-primary py-5 px-4 text-light rounded shadow">
            <div class="form-group">
              <label for="InputUsername">Username</label>
              <input v-model="user.username" type="text" class="form-control text-primary" id="InputUsername" placeholder="Enter a Username" required>
            </div>
            <div class="form-group">
              <label for="InputImage">Profile Photo</label>
              <input v-model="user.image_url" type="text" class="form-control text-primary" id="InputImage" placeholder="Enter an Image URL" required>
            </div>
            <div class="form-group">
              <label for="InputEmail">Email address</label>
              <input v-model="user.email" type="email" class="form-control text-primary" id="InputEmail" placeholder="Enter email" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="user.password" type="password" class="form-control text-primary" id="exampleInputPassword1" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-outline-primary">Signup</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validateSignupUser } from '../validationSchemas.js';
export default {
  name: 'Signup',
  data()  {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        image_url: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['getErrorMessage'])
  },
  methods: {
    ...mapActions('auth', ['signup', 'changeErrorMessage']),
    onSignup(user) {
      const validationMessage = validateSignupUser(user);
      if (validationMessage === null) {
        this.signup(user)
      } else {
        this.changeErrorMessage(validationMessage);
      }
    }
  }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background-color: rgb(13, 29, 44);
  }
.alert-color {
  font-weight: bold;
  color: white;
  background-color: rgba(235, 51, 51, 0.924)
}
</style>
