<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed
    v-model="drawer"
    app
    >
      <v-list dense>
        <router-link v-bind:to="{ name: 'Inicio' }"
        class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name: 'Contacto' }"
        class="side_bar_link"
        >
          <v-list-item>
            <v-list-item-action>
              <v-icon>contact_mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>Contacto</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Inicio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-bind:to="{ name: 'AgregarPelicula' }"
        v-if="usuario_actual">Agregar Película</v-btn>
        <v-btn id="email_usuario" text v-if="usuario_actual">
          Hola {{ usuario_actual.nombre }}</v-btn>
        <v-btn text v-bind:to="{ name: 'Registro' }" v-if="!usuario_actual"
        id="boton_registro">Registro</v-btn>
        <v-btn id="boton_login" text v-bind:to="{ name: 'Login' }" v-if="!usuario_actual">
          Login</v-btn>
        <v-btn text id="boton_logout" v-if="usuario_actual" @click="logout">Cerrar sesión</v-btn>
        <!-- <v-btn text v-bind:to="{ name: 'Login'}">Login</v-btn>
        <v-btn text v-bind:to="{ name: 'Registro' }">Registro</v-btn> -->
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">Fullstack1 &copy; 2022</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';
import bus from './bus';
import './assets/stylesheets/main.css';

export default {
  data: () => ({
    drawer: null,
    usuario_actual: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.obtenerUsuario();
    this.escucharEventos();
  },
  methods: {
    escucharEventos() {
      bus.$on('actualizarUsuario', () => {
        this.obtenerUsuario();
      });
    },
    async obtenerUsuario() {
      return axios({
        method: 'get',
        url: '/usuario_actual',
      })
        .then((respuesta) => {
          this.usuario_actual = respuesta.data.usuario_actual;
        })
        .catch(() => {
        });
    },
    logout() {
      return axios({
        method: 'get',
        url: '/logout',
      })
        .then(() => {
          bus.$emit('actualizarUsuario');
          this.$router.push({ name: 'Inicio' });
        })
        .catch(() => {
        });
    },
  },
};
</script>
