<template>
  <!-- product => id, name et image -->
  <div>
    <div class="card">
      <img
        :src="product.image"
        class="card-img-top"
        :alt="product.name"
      >
      <div class="card-body">
        <h5 class="card-title product-title">{{product.name}}</h5>
        <p
          v-if="product.expiration_date"
          class="card-text peremption"
        >{{getDateParsed(product.expiration_date)}}</p>
        <button
          @click="takeProduct"
          class="btn btn-primary product-button"
        >Je veux ce produit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',
  props: {
    product: Object
  },
  methods: {
    getDateParsed (timestamp) {
      let date = new Date(timestamp);
      return (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    },
    takeProduct () {
      if (!confirm("Ëtes-vous sûr ?")) {
        return
      }
      axios.delete('/api/products/', { data: { id: this.product.id } }).then(() => {
        this.$snotify.success(null, 'Produit retiré !', { timeout: 3000 })
        this.$store.dispatch('removeProduct', this.product.id)
      }).catch(() => {
        this.$snotify.error('Une erreur s\'est produite, veuillez réessayer.', 'Erreur', { timeout: 5000 })
      })
    }
  }
}
</script>

<style scoped>
.product-title {
  font-size: medium;
  font-family: Arial Black, Arial, Verdana, sans-serif;
  text-align: center;
  color: #503d3f;
}
.peremption {
  text-align: center;
}
.product-button {
  background: #880d1e;
  font-size: medium;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  border: #880d1e;
  margin-right: auto;
  margin-left: 10%;
  width: 80%;
}
</style>