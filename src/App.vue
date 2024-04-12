<template>
  <div id="app">
    <!-- Encabezado -->
    <header class="app-header">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </div>
      <nav class="navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/propiedades">Propiedades</router-link>
        <router-link to="/rentas">Renta</router-link>
        <LoginWithGoogle />
      </nav>
    </header>
    
    <!-- Contenido de la Página -->
    <router-view/>
  </div>
</template>
<script>
import LoginWithGoogle from './components/LoginWithGoogle.vue';

export default {
  name: 'App',
  components: {
    LoginWithGoogle
  }
}
</script>
<style>
.app-header {
  display: flex;
  justify-content: center; /* Centra los elementos del encabezado horizontalmente */
  align-items: center; /* Alinea los elementos del encabezado verticalmente */
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}

/* Asegúrate de que el contenedor de navegación ocupe todo el ancho posible para centrar los enlaces */
.navigation {
  display: flex;
  justify-content: center; /* Centra los enlaces dentro del contenedor de navegación */
  align-items: center;
  width: 100%; /* Ocupa todo el ancho disponible */
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
</style>