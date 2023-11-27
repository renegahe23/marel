<template>
    <div class="calendario-container">
      <v-calendar
        :attributes="atributos"
        @day-click="mostrarDetalles"
      ></v-calendar>
  
      <!-- Aquí puedes añadir un modal o un componente para mostrar más detalles -->
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import VCalendar from 'v-calendar';
  import db from '@/firebase'; // Asegúrate de que la ruta es correcta
  
  export default defineComponent({
    name: 'CalendarioPage',
    components: {
      VCalendar
    },
    setup() {
      const atributos = ref([]);
  
      onMounted(async () => {
        try {
          // Aquí obtienes las fechas importantes de Firebase
          const querySnapshot = await db.collection('tuColeccion').get();
          querySnapshot.forEach(doc => {
            const data = doc.data();
            atributos.value.push({
              key: doc.id,
              dates: data.fechaImportante, // Asegúrate de que el formato sea compatible
              // Puedes añadir aquí más propiedades para personalizar cómo se muestran los días
            });
          });
        } catch (error) {
          console.error("Error al obtener las fechas importantes: ", error);
        }
      });
  
      const mostrarDetalles = (fecha) => {
        // Aquí implementas la lógica para mostrar detalles cuando se hace clic en un día
        console.log('Día seleccionado:', fecha);
      };
  
      return { atributos, mostrarDetalles };
    },
    methods: {
    goHome() {
      this.$router.push('/');
    }
  }
    
  });
  </script>
  
  <style>
  .calendario-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .vc-container {
    border: none;
  }
  
  .vc-header {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .vc-header h2 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .vc-nav {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  
  .vc-nav button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1em;
  }
  
  .vc-day {
    transition: background-color 0.3s, color 0.3s;
  }
  
  .vc-day:not(.vc-disabled):hover {
    background-color: #45a049;
    color: white;
    cursor: pointer;
  }
  
  .vc-day.vc-selected, .vc-day.vc-selected:hover {
    background-color: #3498db;
    color: white;
  }
  
  /* Aquí puedes añadir más estilos personalizados para el calendario */
  </style>
  
  