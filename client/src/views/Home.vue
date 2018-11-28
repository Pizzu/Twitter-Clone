<template>
  <section class="main">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col bg-primary d-flex align-items-center justify-content-center text-light">
          <div>
            <h4 class="font-weight-bold mb-5"><i class="fas fa-search mr-2"></i> Segui i tuoi interessi.</h4>
            <h4 class="font-weight-bold mb-5"><i class="fas fa-users mr-2"></i>Ascolta ciò di cui stanno parlando gli altri.</h4>
            <h4 class="font-weight-bold"><i class="far fa-comments mr-2"></i> Partecipa alla conversazioni</h4>
          </div>
        </div>
        <div class="col bgBlueDark d-flex align-items-center justify-content-center text-light">
          <div class="caption">
            <h3 class="font-weight-bold mb-5" style="white-space: pre;">Guarda cosa
sta succedendo nel mondo
in questo istante</h3>
            <p class="font-weight-bold">Iscriviti adesso a twitter.</p>
            <div class="d-flex flex-column align-items-center">
              <router-link to="/login" tag="button" class="btn btn-outline-primary p-2 mb-4 w-100">Login</router-link>
              <router-link to="/signup" tag="button" class="btn btn-outline-primary p-2 w-100">Signup</router-link>
            </div>
          </div>
        </div>
      </div>
     </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.main {
  height: 100vh;
}
.bgBlueDark {
  background-color: rgb(13, 29, 44);
}
.caption h3 {
  font-size: 2.2rem;
}
.caption {
  font-size: 1.2rem;
}
.caption button {
  border-radius: 2rem;
}
</style>
