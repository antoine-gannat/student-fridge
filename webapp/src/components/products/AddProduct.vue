<template>
  <div>
    <button
      class="btn btn-outline-primary btn-ajout-prod"
      v-if="!showForm"
      @click.prevent="showForm = true"
    >Ajouter un produit</button>
    <form
      enctype="multipart/form-data"
      v-if="showForm"
      class="row"
    >
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <button
          class="btn btn-outline-danger"
          @click.prevent="showForm = false"
        >Retour</button>
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name1"
            placeholder="Nom du produit"
            required
          >
        </div>
        <div class="form-group">
          <label for="name">Date de péremption</label>
          <input
            v-model="expirationDate"
            type="date"
            class="form-control"
            id="name1"
            placeholder="Date de péremption"
          >
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div>
          <input
            @change="displayUploadedImage"
            ref="pictureSelection"
            type="file"
            hidden="true"
            accept="image/*;capture=camera"
            required
          >
        </div>
        <img
          @click.prevent="$refs.pictureSelection.click()"
          :hidden="!image"
          ref="imagePreview"
          class="image-preview"
          alt="preview"
        />
        <div
          @click.prevent="$refs.pictureSelection.click()"
          v-if="!image"
          class="image-preview image-preview-empty"
        >
          <span>Ajouter une image</span>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary col-4 offset-4"
        @click.prevent="submitProduct"
      >Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  data: () => {
    return {
      showForm: false,
      name: null,
      image: null,
      expirationDate: null
    }
  },
  methods: {
    displayUploadedImage (e) {
      let that = this
      if (e.srcElement && e.srcElement.files && e.srcElement.files[0]) {
        this.image = e.srcElement.files[0]
        var reader = new FileReader();

        reader.onload = function (e) {
          that.$refs.imagePreview.src = e.target.result;
        }

        reader.readAsDataURL(e.srcElement.files[0]);
      }
    },
    submitProduct () {
      if (!this.name) {
        this.$snotify.error("Merci d'ajouter un nom", "Erreur", { timeout: 3000 })
        return
      }
      if (!this.image) {
        this.$snotify.error("Merci d'ajouter une image", "Erreur", { timeout: 3000 })
        return
      }
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.name);
      formData.append('expirationDate', this.expiration)
      axios.post('/api/products/', formData).then(() => {
        this.$snotify.success('Produit ajouter !', 'Succès !', { timeout: 2000 })
      }).catch((err) => {
        this.$snotify.error(err.response.data.message, 'Erreur !', { timeout: 5000 })
      })
    }
  }
}
</script>

<style scoped>
.image-preview {
  margin: 1em;
  max-width: 100%;
  max-height: 300px;
  transition: all 200ms;
}

.image-preview:hover {
  cursor: pointer;
  -webkit-box-shadow: 0px 22px 44px -35px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 22px 44px -35px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 22px 44px -35px rgba(0, 0, 0, 0.75);
}

.image-preview:hover span {
  text-decoration: underline;
  font-weight: 700;
}

.image-preview-empty {
  background: rgb(224, 224, 224);
  height: 300px;
}

.image-preview-empty span {
  position: absolute;
  width: 30%;
  text-align: center;
  left: 35%;
  top: 45%;
}

.btn-ajout-prod{
  background: #880D1E;
  font-size: medium;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: #EEE0CB;
  border: #880D1E;
}
.btn-ajout-prod:hover{
  background: #E06E4E;
}
</style>