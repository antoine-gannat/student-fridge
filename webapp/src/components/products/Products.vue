<template>
  <section class="products">
    <h2 class="mr-2">Au menu</h2>
    <AddProduct v-if="user" />
    <div class="row">
      <Product
        class="col-sm-12 col-md-6 col-lg-4 mb-4"
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
      products: state => state.products,
      user: state => state.user
    })
  }
}
</script>

<style scoped>
.products {
  background: rgb(253, 253, 253);
  height: 500px;
  padding: 0 8% 0 8%;
}
</style>
