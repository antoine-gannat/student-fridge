<template>
  <section class="products">
    <h2 class="mr-2 titre">Produits disponibles</h2>
    <AddProduct v-if="user" />
    <div
      class="row product-container"
      v-if="user"
    >
      <Product
        class="col-sm-12 col-md-6 col-lg-4 mb-4"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div
      v-else
      class="connect"
    >
      Connectez-vous pour voir les produits disponibles
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AddProduct from './AddProduct'
import Product from './Product';
export default {
  name: 'Products',
  components: {
    AddProduct,
    Product
  },
  computed: {
    ...mapState({
      products: state => state.products,
      user: state => state.user
    })
  }
}
</script>

<style scoped>
.products {
  background: #eee0cb;
  height: 100%;
  padding: 0% 8% 0 8%;
}

.product-container {
  padding-top: 5%;
}

.titre {
  padding-top: 3%;
  padding-bottom: 3%;
  text-align: center;
  color: #503d3f;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: double underline #e06e4e;
}

.connect {
  text-align: center;
  color: #880d1e;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
