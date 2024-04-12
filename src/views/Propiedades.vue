<template>
  <div v-if="isLoggedIn">
    <div class="propiedades-container">
      <header class="header">
        <button @click.stop="mostrarModalAgregarInmueble" class="boton boton-accion">Agregar Inmueble</button>
      </header>
      <div class="tarjetas-container">
  <div v-for="propiedad in propiedades" :key="propiedad.id" class="tarjeta">
    <div @click="seleccionarPropiedad(propiedad)">
      <h3>{{ propiedad.nombre }}</h3>
      <p><strong>Inquilino:</strong> {{ propiedad.inquilinoNombre }}</p>
      <p><strong>Renta:</strong> ${{ propiedad.renta }}</p>
      <p><strong>Día de Pago de Renta:</strong> {{ propiedad.diaPagoRenta }}</p>
    </div>
    <button class="boton" @click.stop="confirmarBorrado(propiedad.id)">🗑️</button>
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
        @inmueble-agregado="cargarPropiedades" 
      />
    </div>
    </div>
    <div v-else>
    <p>Por favor, inicia sesión.</p>
  </div>
  </template>
  
      
  
  <script>
import { defineComponent, ref, onMounted } from 'vue';
import  { db }  from '@/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ModalEditarInmueble from '@/components/ModalEditarInmueble.vue';
import ModalAgregarInmueble from '@/components/ModalAgregarInmueble.vue';
import { mapGetters } from 'vuex';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PropiedadesPage',
  computed: {
    ...mapGetters(['user']),
    isLoggedIn() {
      return !!this.user;
    }
  },
  components: {
    ModalEditarInmueble,
    ModalAgregarInmueble
  },
  setup() {
    const propiedades = ref([]);
    const inmuebleSeleccionado = ref(null);
    const mostrarModalAgregar = ref(false);
    const store = useStore(); // Access the Vuex store instance

    // En src/views/Propiedades.vue

    const cargarPropiedades = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Inmuebles'));
      const userEmail = store.getters.user.email; // Access user email using Vuex getter
      propiedades.value = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(propiedad => propiedad.usuarioId === userEmail);
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
    goHome() {
      this.$router.push('/');
    }
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

/* Estilo base para botones */
.boton {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, box-shadow 0.3s;
}

/* Estilo para botones de acción principal (Guardar, Agregar) */
.boton-accion {
  background-color: #4CAF50;
  color: white;
}

.boton-accion:hover {
  background-color: #3e8e41;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Estilo para botones de cancelación o eliminación */
.boton-cancelar, .boton-borrar {
  background-color: #f44336;
  color: white;
}

.boton-cancelar:hover, .boton-borrar:hover {
  background-color: #d32f2f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Estilo para botones secundarios (Editar, Ver Pagos) */
.boton-secundario {
  background-color: #3498db;
  color: white;
}

.boton-secundario:hover {
  background-color: #2980b9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

.boton-borrar2 {
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(14, 2, 2, 0); /* O el color que prefieras */
}
</style>

  