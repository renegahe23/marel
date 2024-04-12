<template>
  <div class="modal-backdrop" @click="cerrarModal">
    <div class="modal" @click.stop>
      <h2>Gestión de Renta - {{ inmueble.nombre }}</h2>
      <form @submit.prevent="guardarRenta">
        <div class="form-field">
          <label for="diaPago">Día de Pago</label>
          <input type="number" id="diaPago" v-model="renta.diaPago" />
        </div>
        <div class="form-field">
          <label for="mesPago">Mes de Pago</label>
          <select id="mesPago" v-model="renta.mesPago">
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div class="form-field">
          <label for="añoPago">Año de Pago</label>
          <input type="number" id="anoPago" v-model="renta.anoPago" />
        </div>
        <div class="form-field">
          <label for="cantidadPago">Cantidad de Pago</label>
          <input
            type="number"
            id="cantidadPago"
            v-model.number="renta.cantidadPago"
          />
        </div>
        
<button type="submit" class="boton boton-accion">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import  { db, auth }  from '@/firebase'; // Verifica que esta sea la ruta correcta

export default defineComponent({
  props: {
    inmueble: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const renta = ref({
      diaPago: "",
      mesPago: "",
      anoPago: "", // Cambiado de 'añoPago' a 'anoPago'
      cantidadPago: props.inmueble.renta,
    });

    // En ModalGestionRentas.vue o en el componente que maneje la lógica de guardar pagos

const guardarRenta = async () => {
  try {
    // Verifica si hay un usuario autenticado
    if (auth.currentUser) {
      const usuarioEmail = auth.currentUser.email; // Obtiene el email del usuario autenticado

      await addDoc(collection(db, "Rentas"), {
        idInmueble: props.inmueble.id,
        nombreInmueble: props.inmueble.nombre,
        diaPago: renta.value.diaPago,
        mesPago: renta.value.mesPago,
        anoPago: renta.value.anoPago,
        cantidadPago: renta.value.cantidadPago,
        usuarioEmail: usuarioEmail, // Añade el email del usuario al objeto de pago
      });
      console.log("Renta guardada con éxito");
      emit("cerrarModal");
    } else {
      console.error("No hay usuario autenticado");
    }
  } catch (error) {
    console.error("Error al guardar la renta: ", error);
  }
};

    const cerrarModal = () => {
      emit("cerrarModal");
    };

    return { renta, guardarRenta, cerrarModal };
  },
});
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
</style>
