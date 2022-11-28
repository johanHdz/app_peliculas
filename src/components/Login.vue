<template>
  <div>
    <div class="login">
      <a class="btn facebook" href="/login/facebook">Login con Facebook</a>
      <a class="btn google" href="/login/google">Login con Google</a>
      <a class="btn linkedin" href="/login/linkedin">Login con LinkedIn</a>
    </div>
    <v-form v-model="valido" ref="formulario" lazy-validation>
      <v-text-field
        label="Email:"
        v-model="email"
        :rules="reglasEmail"
        required>
      </v-text-field>
      <v-text-field
        label="Contrseña:"
        v-model="contrasenia"
        type="password"
        required>
      </v-text-field>
      <v-btn @click="acceder" :disabled="!valido">Acceder</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import bus from './../bus';

export default {
  data: () => ({
    valido: true,
    email: '',
    contrasenia: '',
    reglasEmail: [
      v => !!v || 'Email requerido',
      v => /\S+@\S+\.\S+/.test(v) || 'Email invalido',
    ],
  }),
  methods: {
    async acceder() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          contrasenia: this.contrasenia,
        },
        // url: 'http://localhost:8081/usuarios/login',
        url: '/usuarios/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          window.localStorage.setItem('auth', res.data.token);
          this.$swal('', 'Ha iniciado sesión correctamente', 'success');
          bus.$emit('actualizarUsuario');
          this.$router.push({ name: 'Inicio' });
        })
        .catch((error) => {
          const mensaje = error.response.data;
          this.$swal('Error', `${mensaje}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
