<template>
  <div v-if="isLoggedIn">
    <div class="home-container">
    
    <div class="image-container">
      <img src="@/edificios.png" alt="Edificios" class="home-image">
      <button class="nav-button" @click="goToPropiedades">Propiedades</button>
    </div>
    <div class="image-container">
      <img src="@/dollar-icon.png" alt="Icono de Dinero" class="home-image">
      <button class="nav-button" @click="goToRentas">Rentas</button>
    </div></div>
  </div>
  <div v-else>
    <p>Por favor, inicia sesión.</p>
  </div>
</template>


  
<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomePage',
  computed: {
    ...mapGetters(['user']),
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    goToPropiedades() {
      this.$router.push('/propiedades');
    },
    goToRentas() {
      this.$router.push('/rentas');
    }
  }
});
</script>
  
  <style>
body {
  background: url('https://img.freepik.com/fotos-premium/fondo-textura-marmol-blanco-textura-marmol-abstracta-patrones-naturales-diseno_41389-491.jpg') no-repeat center center fixed; 
  background-size: cover; /* Asegura que la imagen cubra todo el fondo */
}

.home-container {
  padding: 50px 0;
  font-family: 'Open Sans', sans-serif;
  color: #333;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}

.logo-container {
  flex: 1;
}

.logo {
  height: 50px;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
}

.navigation a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.navigation a:hover {
  background-color: #555;
}

.image-container {
  display: inline-block; /* Cambiado de flex a inline-block */
  text-align: center;
  width: 50%; /* Establece el ancho para controlar el tamaño de las imágenes y los botones */
}

.home-image {
  max-width: 70%; /* Ajusta el ancho máximo para que la imagen se escale con el contenedor */
  height: auto;
  margin-bottom: 10px;
}

.nav-button {
  display: block; /* Esto hace que el botón ocupe todo el ancho del contenedor */
  width: 100%; /* Ajusta el botón al ancho del contenedor de la imagen */
  border: 2px solid #2c3e50;
  background-color: transparent;
  text-align: center;
  color: #2c3e50;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #2c3e50;
  color: white;
}

  </style>
  