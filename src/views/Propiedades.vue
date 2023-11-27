<template>
    <div class="propiedades-container">
      <header class="header">
        PROPIEDADES
        <button @click="mostrarModalAgregarInmueble">Agregar Inmueble</button>
      </header>
      <div class="tarjetas-container">
  <div v-for="propiedad in propiedades" :key="propiedad.id" class="tarjeta">
    <div @click="seleccionarPropiedad(propiedad)">
      <h3>{{ propiedad.nombre }}</h3>
      <p><strong>Inquilino:</strong> {{ propiedad.inquilinoNombre }}</p>
      <p><strong>Renta:</strong> ${{ propiedad.renta }}</p>
      <p><strong>Día de Pago de Renta:</strong> {{ propiedad.diaPagoRenta }}</p>
    </div>
    <button class="boton-borrar" @click.stop="confirmarBorrado(propiedad.id)">🗑️</button>
  </div>
</div>
  
      <!-- Modales... -->
      <!-- Modal para Ver/Editar Inmueble -->
      <ModalEditarInmueble
        v-if="inmuebleSeleccionado"
        :inmueble="inmuebleSeleccionado"
        @actualizar="actualizarInmueble"
        @cerrar="inmuebleSeleccionado = null"
      />
  
      <!-- Modal para Agregar Inmueble -->
      <ModalAgregarInmueble
        v-if="mostrarModalAgregar"
        @cerrar="mostrarModalAgregar = false"
      />
    </div>
  </template>
  
      
  
  <script>
import { defineComponent, ref, onMounted } from 'vue';
import db from '@/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ModalEditarInmueble from '@/components/ModalEditarInmueble.vue';
import ModalAgregarInmueble from '@/components/ModalAgregarInmueble.vue';

export default defineComponent({
  name: 'PropiedadesPage',
  components: {
    ModalEditarInmueble,
    ModalAgregarInmueble
  },
  setup() {
    const propiedades = ref([]);
    const inmuebleSeleccionado = ref(null);
    const mostrarModalAgregar = ref(false);

    const cargarPropiedades = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Inmuebles'));
        propiedades.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error al obtener los inmuebles: ", error);
      }
    };

    onMounted(cargarPropiedades);

    const seleccionarPropiedad = (propiedad) => {
      inmuebleSeleccionado.value = propiedad;
    };

    const mostrarModalAgregarInmueble = () => {
      mostrarModalAgregar.value = true;
    };

    const actualizarInmueble = async (inmuebleActualizado) => {
      // Aquí implementas la lógica para actualizar el inmueble en Firebase
      console.log('Actualizar inmueble:', inmuebleActualizado);
      // Recargar las propiedades después de actualizar
      cargarPropiedades();
    };
    

    return {
      propiedades,
      inmuebleSeleccionado,
      seleccionarPropiedad,
      mostrarModalAgregar,
      mostrarModalAgregarInmueble,
      actualizarInmueble
    };
  },
  methods: {
    async confirmarBorrado(id) {
      if (confirm('¿Estás seguro de querer borrar este inmueble?')) {
        try {
          await deleteDoc(doc(db, "Inmuebles", id));
          console.log('Inmueble borrado con éxito');
          this.cargarPropiedades(); // Recargar la lista de inmuebles
        } catch (error) {
          console.error("Error al borrar el inmueble: ", error);
        }
      }
    },
    
    // ...otros métodos...
  }
});
</script>

  
  <style>
.propiedades-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5em;
  color: #2c3e50;
}

.button-agregar {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-agregar:hover {
  background-color: #3e8e41;
}

.tarjetas-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tarjeta {
  border: 1px solid #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.tarjeta:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.tarjeta h3 {
  background-color: #3498db;
  color: white;
  margin: 0;
  padding: 15px;
  font-size: 1.5em;
}

.tarjeta p {
  padding: 10px 15px;
  margin: 0;
  line-height: 1.6;
}

.boton-borrar {
  background: none;
  border: none;
  cursor: pointer;
  color: red; /* O el color que prefieras */
}
</style>

  