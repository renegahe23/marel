<template>
  <div class="inmuebles-container">
    <header class="header">RENTAS</header>
    <div class="tarjetas-container">
      <div class="tarjeta" v-for="inmueble in inmuebles" :key="inmueble.id" @click="abrirModalGestionRentas(inmueble)">
        <h3>{{ inmueble.nombre }}</h3>
        <p><strong>Inquilino:</strong> {{ inmueble.inquilinoNombre }}</p>
        <p>Día de Pago de Renta: {{ inmueble.diaPagoRenta }}</p>
        <p>Renta: ${{ inmueble.renta }}</p>
        <p>Tipo de Renta: {{ inmueble.tipoRenta }}</p>
      <!-- Botón para mostrar los pagos -->
      <button @click.stop="abrirModalPagos(inmueble)">Ver Pagos</button>
    </div>
  </div>


    <ModalGestionRentas v-if="inmuebleSeleccionado" :inmueble="inmuebleSeleccionado" @cerrarModal="inmuebleSeleccionado = null" />
  </div>
  <div class="rentas-pagadas-container">
      <h2>Rentas Pagadas Este Mes</h2>
      <ul>
        <li v-for="renta in rentasPagadas" :key="renta.id">
          {{ renta.nombreInmueble }} - ${{ renta.cantidadPago }} - Pagado el: {{ renta.diaPago }}
        </li>
      </ul>
    </div>

    <div class="faltantes-pago-container">
  <h2>Faltantes de Pago Este Mes</h2>
  <ul>
    <li v-for="inmueble in faltantesDePago" :key="inmueble.id">
      {{ inmueble.nombre }} - Día de Pago: {{ inmueble.diaPagoRenta }} - Telefono Inquilino: {{ inmueble.telefonoInquilino }}
    </li>
  </ul>
</div>
<!--<div class="deudores-container">
  <h2>Lista de Deudores</h2>
  <ul>
    <li v-for="deudor in listaDeudores" :key="deudor.nombreInmueble + deudor.mesDeuda">
      {{ deudor.nombreInmueble }} - Mes: {{ deudor.mesDeuda }}
    </li>
  </ul>
</div>-->

<ModalPagos
    v-if="abrirModalPagos"
    :inmueble="inmuebleParaPagos"
    :mostrar="mostrarModalPagos"
    @cerrar="cerrarModalPagos"
  />

  
</template>
<script>
import ModalGestionRentas from '@/components/ModalGestionRentas.vue';
import { defineComponent, ref, onMounted } from 'vue';
import db from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ModalPagos from '@/components/ModalPagos.vue';

export default defineComponent({
  name: 'InmueblesPage',
  components: {
    ModalGestionRentas,
    ModalPagos
  },
  setup() {
    const inmuebles = ref([]);
    const inmuebleSeleccionado = ref(null);
    const rentasPagadas = ref([]);
    const faltantesDePago = ref([]);
    const mostrarModalPagos = ref(false);
    const inmuebleParaPagos = ref(null);
    onMounted(async () => {
      await cargarInmuebles();
      await cargarRentasPagadas();
      await identificarFaltantesDePago();
    });
    const cargarInmuebles = async () => {
      const querySnapshot = await getDocs(collection(db, 'Inmuebles'));
      inmuebles.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };
  

    const cargarRentasPagadas = async () => {
      const hoy = new Date();
      const mesActual = String(hoy.getMonth() + 1);
      const anoActual = hoy.getFullYear();

      const rentasRef = collection(db, 'Rentas');
      const querySnapshot = await getDocs(rentasRef);

      rentasPagadas.value = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(renta => renta.mesPago === mesActual && renta.anoPago === anoActual);
    };

    const identificarFaltantesDePago = async () => {
      const hoy = new Date();
      const mesActual = String(hoy.getMonth() + 1); // Mes actual como string
      const anoActual = hoy.getFullYear(); // Año actual
      const diaActual = hoy.getDate(); // Día actual

      const rentasRef = collection(db, 'Rentas');
      const querySnapshot = await getDocs(rentasRef);

      inmuebles.value.forEach(inmueble => {
        const haPagadoEsteMes = querySnapshot.docs.some(doc => {
          const renta = doc.data();
          return renta.idInmueble === inmueble.id && renta.mesPago === mesActual && renta.anoPago === anoActual;
        });

        if (!haPagadoEsteMes && diaActual > inmueble.diaPagoRenta) {
          faltantesDePago.value.push({
            nombreInmueble: inmueble.nombre,
            telefonoInquilino: inmueble.inquilinoTelefono, // Asegúrate de que este campo exista en los inmuebles
            diaPagoRenta: inmueble.diaPagoRenta
          });
        }
      });
    };

    const abrirModalGestionRentas = (inmueble) => {
      inmuebleSeleccionado.value = inmueble;
    };

    const abrirModalPagos = (inmueble) => {
      inmuebleParaPagos.value = inmueble;
      mostrarModalPagos.value = true;
    };

    const cerrarModalPagos = () => {
      mostrarModalPagos.value = false;
      inmuebleParaPagos.value = null;
    };


    return { 
      inmuebles, 
      inmuebleSeleccionado, 
      rentasPagadas, 
      faltantesDePago, 
      abrirModalGestionRentas, 
      mostrarModalPagos, 
      inmuebleParaPagos, 
      abrirModalPagos, 
      cerrarModalPagos 
    };
  }
});
</script>









<style>
.inmuebles-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
  background-color: #4caf50;
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
