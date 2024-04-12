<template>
  <div class="modal-backdrop" @click="cerrarModal">
    <div class="modal" @click.stop>
      <h2>Editar Inmueble</h2>
      <form @submit.prevent="editarInmueble">
        <!-- Campos del Inmueble -->
        <div class="form-field">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model="inmuebleLocal.nombre" />
        </div>
        <div class="form-field">
          <label for="direccion">Dirección</label>
          <input type="text" id="direccion" v-model="inmuebleLocal.direccion" />
        </div>
        <div class="form-field">
          <label for="metrosCuadrados">Metros Cuadrados</label>
          <input
            type="number"
            id="metrosCuadrados"
            v-model.number="inmuebleLocal.metrosCuadrados"
          />
        </div>
        <div class="form-field">
          <label for="cuotaMantenimiento">Cuota de Mantenimiento</label>
          <input
            type="number"
            id="cuotaMantenimiento"
            v-model.number="inmuebleLocal.cuotaMantenimiento"
          />
        </div>
        <div class="form-field">
          <label for="asegurado">Asegurado</label>
          <input
            type="checkbox"
            id="asegurado"
            v-model="inmuebleLocal.asegurado"
          />
        </div>
        <div class="form-field">
          <label for="fechaVencimientoSeguro"
            >Fecha de Vencimiento del Seguro</label
          >
          <input
            type="date"
            id="fechaVencimientoSeguro"
            v-model="inmuebleLocal.fechaVencimientoSeguro"
          />
        </div>
        <div class="form-field">
          <label for="tipoRenta">Tipo de Renta</label>
          <select id="tipoRenta" v-model="inmuebleLocal.tipoRenta">
            <option value="Rentado">Rentado</option>
            <option value="AirBnb">AirBnb</option>
          </select>
        </div>
        <!-- Campos del Inquilino -->
        <div class="form-field">
          <label for="inquilinoNombre">Nombre del Inquilino</label>
          <input
            type="text"
            id="inquilinoNombre"
            v-model="inmuebleLocal.inquilinoNombre"
          />
        </div>
        <div class="form-field">
          <label for="inquilinoTelefono">Teléfono del Inquilino</label>
          <input
            type="text"
            id="inquilinoTelefono"
            v-model="inmuebleLocal.inquilinoTelefono"
          />
        </div>
        <div class="form-field">
          <label for="linkContrato">Link al Contrato</label>
          <input
            type="text"
            id="linkContrato"
            v-model="inmuebleLocal.linkContrato"
          />
        </div>
        <div class="form-field">
          <label for="formaPago">Forma de Pago</label>
          <select id="formaPago" v-model="inmuebleLocal.formaPago">
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <!-- Agregar campos faltantes -->

        <div class="form-field">
          <label for="fechaIngreso">Fecha de Ingreso</label>
          <input
            type="date"
            id="fechaIngreso"
            v-model="inmuebleLocal.fechaIngreso"
          />
        </div>

        <div class="form-field">
          <label for="vencimientoContrato">Vencimiento Contrato</label>
          <input
            type="date"
            id="vencimientoContrato"
            v-model="inmuebleLocal.vencimientoContrato"
          />
        </div>

        <div class="form-field">
          <label for="renta">Renta</label>
          <input type="number" id="renta" v-model="inmuebleLocal.renta" />
        </div>

        <div class="form-field">
          <label for="diaPagoRenta">Día de Pago de Renta</label>
          <input
            type="number"
            id="diaPagoRenta"
            v-model.number="inmuebleLocal.diaPagoRenta"
            min="1"
            max="31"
          />
        </div>

        <!-- Campos de Gastos -->
        <div v-if="inmuebleLocal.tipoRenta === 'AirBnb'">
        <div class="form-field">
          <label for="internet">Gasto de Internet</label>
          <input
            type="number"
            id="internet"
            v-model.number="inmuebleLocal.gastos.internet"
          />
        </div>
        <div class="form-field">
          <label for="vigilancia">Gasto de Vigilancia</label>
          <input
            type="number"
            id="vigilancia"
            v-model.number="inmuebleLocal.gastos.vigilancia"
          />
        </div>
        <div class="form-field">
          <label for="agua">Gasto de Agua</label>
          <input
            type="number"
            id="agua"
            v-model.number="inmuebleLocal.gastos.agua"
          />
        </div>
        <div class="form-field">
          <label for="luz">Gasto de Luz</label>
          <input
            type="number"
            id="luz"
            v-model.number="inmuebleLocal.gastos.luz"
          />
        </div>
        <div class="form-field">
          <label for="gas">Gasto de Gas</label>
          <input
            type="number"
            id="gas"
            v-model.number="inmuebleLocal.gastos.gas"
          />
        </div>
        <div class="form-field">
          <label for="seguro">Gasto de Seguro</label>
          <input
            type="number"
            id="seguro"
            v-model.number="inmuebleLocal.gastos.seguro"
          />
        </div>
      </div>
        <!-- Botones del Formulario -->
        <div class="form-buttons">
          <button type="submit">Guardar Cambios</button>
          <button type="button" @click="cerrarModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import  { db }  from '@/firebase'; // Asegúrate de tener la referencia correcta a tu configuración de Firebase
import { doc, updateDoc } from "firebase/firestore";

export default {
  props: {
    inmueble: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const inmuebleLocal = ref({ ...props.inmueble });

    watch(
      () => props.inmueble,
      (nuevoValor) => {
        inmuebleLocal.value = { ...nuevoValor };
      }
    );

    const editarInmueble = async () => {
      try {
        const docRef = doc(db, "Inmuebles", inmuebleLocal.value.id);
        await updateDoc(docRef, { ...inmuebleLocal.value });
        console.log("Inmueble editado con éxito");
        emit("actualizar", inmuebleLocal.value);
        emit("cerrar");
      } catch (error) {
        console.error("Error al editar el inmueble: ", error);
      }
    };

    const cerrarModal = () => {
      emit("cerrar");
    };

    return { inmuebleLocal, editarInmueble, cerrarModal };
  },
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
