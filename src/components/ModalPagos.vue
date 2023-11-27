<template>
    <div v-if="mostrar" class="modal-backdrop">
      <div class="modal">
        <h2>Pagos del Inmueble: {{ inmueble.nombre }}</h2>
        <ul>
          <li v-for="pago in pagos" :key="pago.id">
            Fecha: {{ pago.fechaPago }}, Cantidad: ${{ pago.cantidadPago }}
          </li>
        </ul>
        <div class="form-buttons">
          <button type="button" @click="cerrar">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import db from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  props: {
    inmueble: Object,
    mostrar: Boolean,
  },
  data() {
    return {
      pagos: [],
    };
  },
  methods: {
    cerrar() {
      this.$emit('cerrar');
    },
    async cargarPagos() {
      if (this.inmueble && this.inmueble.id) {
        const pagosRef = collection(db, 'Rentas');
        const q = query(pagosRef, where('idInmueble', '==', this.inmueble.id));

        try {
          const querySnapshot = await getDocs(q);
          this.pagos = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              nombreInmueble: data.nombreInmueble,
              cantidadPago: data.cantidadPago,
              fechaPago: `${data.diaPago}/${data.mesPago}/${data.anoPago}` // Formateamos la fecha
            };
          });
        } catch (error) {
          console.error('Error al cargar pagos:', error);
          this.pagos = [];
        }
      }
    }
  },
  watch: {
    inmueble(newVal) {
      if (newVal) {
        this.cargarPagos();
      }
    }
  }
};
</script>

  
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 500px;
}

.modal h2 {
  color: #2c3e50;
  margin-top: 0;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-field input[type="text"],
.form-field input[type="number"],
.form-field input[type="date"],
.form-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-field input[type="checkbox"] {
  margin-top: 10px;
}

.form-buttons {
  text-align: right;
  margin-top: 20px;
}

.form-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.form-buttons button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

.form-buttons button[type="button"] {
  background-color: #f44336;
  color: white;
}
</style>
