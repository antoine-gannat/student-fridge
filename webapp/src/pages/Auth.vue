<template>
  <main>
    <section>
      <div class="authentication-block col-lg-5 col-md-6 col-sm-12 col-xs-12">
        <nav class="authentication-nav">
          <button
            @click.prevent="selectedPage = 'signin'"
            class="btn shadow-none"
            :class="{'selected': selectedPage === 'signin'}"
          >Se connecter</button>
        </nav>
        <SignIn
          class="authentication-elem"
          v-if="selectedPage === 'signin'"
        />
        <SignUp
          class="authentication-elem"
          v-else
        />
      </div>
    </section>
  </main>
</template>

<script>
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
export default {
  name: "auth",
  data: () => {
    return {
      selectedPage: 'signin'
    }
  },
  methods: {
    initSelectedPage () {
      // get the selected page from the url
      if (this.$route.params.type === 'signup'
        || this.$route.params.type === 'signin') {
        this.selectedPage = this.$route.params.type;
      }
    }
  },
  watch: {
    $route () {
      this.initSelectedPage();
    }
  },
  mounted () {
    this.initSelectedPage();
  },
  components: {
    SignIn,
    SignUp
  }
};
</script>

<style scoped>
main {
  background-color: #eee0cb;
  height: 100%;
  width: 100%;
  position: fixed;
}
.authentication-block {
  background: #880d1e;
  min-height: 400px;
  height: 50vh;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15vh;
  -webkit-box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
}
.authentication-nav {
  width: 100%;
  background: rgb(216, 216, 216);
}

.authentication-nav button {
  width: 100%;
  border-radius: 0;
  opacity: 0.5;
}

.authentication-nav .selected {
  background: #880d1e;
  color: white;
  opacity: 1;
}

.authentication-elem {
  padding: 2em;
  color: white;
}

.authentication-elem .submit-btn {
  width: 50%;
  margin-left: 25%;
}
</style>