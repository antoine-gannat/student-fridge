<template>
  <section class="products container">
    <h2 class="mr-2">Au menu</h2>
    <AddProduct />
    <div>
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
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
      products: state => state.products
    })
  }
}
</script>

<style scoped>
.products {
  height: 500px;
}
</style>
