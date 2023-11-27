<template>
  <div class="home-container">
    <header class="header">
      MAREL
    </header>
    <div class="image-container">
      <img src="@/edificios.png" alt="Edificios" class="home-image">
      <button class="nav-button" @click="goToPropiedades">Propiedades</button>
    </div>
    <div class="image-container">
      <img src="@/dollar-icon.png" alt="Icono de Dinero" class="home-image">
      <button class="nav-button" @click="goToCalendario">Rentas</button>
    </div>
  </div>
</template>


  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HomePage',
    methods: {
      goToPropiedades() {
        this.$router.push('/propiedades');
      },
      goToCalendario() {
        this.$router.push('/calendario');
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

.header {
  font-size: 3em;
  color: #2c3e50;
  margin-bottom: 50px;
  text-align: right; /* Centra el texto dentro del encabezado */
  padding: 20px;
 
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
  