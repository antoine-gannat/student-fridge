<template>
  <main>
    <!-- Landing picture -->
    <section class="landing-section">
      <div class="description-container">
        <h2>Fini le gaspillage ! </h2>
        <p class="description">Les yeux plus gros que le ventre ? Partage avec d'autre étudiants !</p>
        <p>La vie est dure ? Notre frigo est là ! </p>
        <router-link
          to="/auth"
          class="btn btn-primary"
        >Rejoins nous !</router-link>
      </div>
    </section>
    <section class="faq">
      <h2 class="subtitle">Qu'estce que quoi ?</h2>
    </section>
    <section class="menu">
      <h2 class="subtitle">Au menu</h2>

    </section>
  </main>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.landing-section {
  height: 90vh;
  width: 100%;
  background: url(/img/stock.jpeg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  -webkit-box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
  box-shadow: inset -415px 45px 114px 37px rgba(0, 0, 0, 0.61);
}

.description-container {
  color: white;
  position: absolute;
  width: auto;
  padding: 1em;
  top: 40%;
  right: 20px;
  text-align: right;
}

.subtitle {
  position: absolute;
  left: 15%;
}

.faq {
  height: 500px;
}

.menu {
  height: auto;
}
</style>