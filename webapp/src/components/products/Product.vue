<template>
  <div>
    <p>{{product.name}}</p>
    <img :src="product.image" />
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  }
}
</script>

<style scoped>
</style>