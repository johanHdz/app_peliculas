<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
    <v-text-field
    label="Nombre:"
    v-model="nombre"
    require>
    </v-text-field>
    <v-text-field
    label="Correo:"
    v-model="email"
    :rules="reglasEmail"
    required>
    </v-text-field>
    <v-text-field
    label="Contraseña:"
    v-model="contrasenia"
    required>
    </v-text-field>
    <v-text-field
    label="Confirmar contraeña:"
    v-model="confirmar_contrasenia"
    type="password">
    </v-text-field>
    <v-btn @click="registrar"
    :disabled="!valido">
    Registrar</v-btn>
    <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    email: '',
    contrasenia: '',
    confirmar_contrasenia: '',
    reglasEmail: [
      v => !!v || 'Se requiere el email',
      v => /\S+@\S+\.\S+/.test(v) || 'el email debe ser válido',
    ],
  }),
  methods: {
    async registrar() {
      if (this.$refs.formulario.validate()) {
        // Agregar proceso
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            email: this.email,
            contrasenia: this.contrasenia,
          },
          url: 'http://localhost:8081/usuarios/registro',
          // url: '/usuarios/registro',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Excelente',
              'Se ha registrado correctamente',
              'success',
            );
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            const mensaje = error.response.data.mensaje;
            this.$swal('Error', `${mensaje}`, 'error');
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
