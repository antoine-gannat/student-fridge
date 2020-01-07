<template>
<!-- product => id, name et image -->
  <div>
    <div class="card">
      <img :src="product.image" class="card-img-top" :alt="product.name">
      <div class="card-body">
        <h5 class="card-title product-title">{{product.name}}</h5>
        <p class="card-text peremption">{{product.expiration_date}}</p>
        <button href="#" class="btn btn-primary product-button">Je veux ce produit</button>
      </div>
    </div>
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
.product-title{
  font-size: medium;
  font-family: Arial Black, Arial, Verdana, sans-serif;
  text-align: center;
  color: #503D3F
}
.peremption{
  text-align: center;
}
.product-button{
background: #880D1E;
font-size: medium;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
border: #880D1E;
margin-right: auto;
margin-left: 10%;
width: 80%;


}

</style>