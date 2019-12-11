<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <!-- Title -->
    <router-link
      class="navbar-brand"
      to="/"
    >SOLIDARYFRIDGE
    </router-link>
    <!-- Menu toggler for small screens -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Navbar content -->
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav">
        <!-- Log in button -->
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/auth"
          >Se connecter
          </router-link>
        </li>
        <!-- Create an account button -->
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/auth"
          >Créer un compte
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  background-attachment: rgba(0, 0, 0, 0);
}

.title {
  font-size: 23px;
}
</style>