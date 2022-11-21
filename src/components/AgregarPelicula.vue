<template>
  <v-form v-model="valido" ref="form" lazy-validation>
    <v-text-field label="Nombre:"
    v-model="nombre"
    :rules="reglasNombre"
    required
    ></v-text-field>
    <v-text-field label="Descripción:"
    v-model="descripcion"
    multiline
    required
    :rules="reglasDescripcion"
    ></v-text-field>
    <v-select label="Año de publicación"
    v-model="anio_pub"
    :items="anios"
    required
    :rules="reglasAnioPub"
    ></v-select>
    <v-text-field label="Genero"
    v-model="genero"
    required
    :rules="reglasGenero"
    ></v-text-field>
    <v-btn @click="enviar" :disabled="!valido">
      Enviar
    </v-btn>
    <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    descripcion: '',
    reglasDescripcion: [
      v => !!v || 'Se requiere la descripción de la película',
    ],
    genero: '',
    reglasGenero: [
      v => !!v || 'Se requiere el género de la película',
      v => (v && v.length <= 80) || 'El género debe ser menor o igual a 80',
    ],
    anio_pub: '',
    reglasNombre: [
      v => !!v || 'Se requiere el nombre de la pelicula',
    ],
    reglasAnioPub: [
      v => !!v || 'Se requiere establecer el año de publicación de la película',
    ],
    select: null,
    anios: [
      '2022',
      '2021',
      '2020',
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
    ],
  }),
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        // Realizar una accion
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            descripcion: this.descripcion,
            anio_pub: this.anio_pub,
            genero: this.genero,
          },
          // url: 'http://localhost:8081/peliculas',
          url: '/peliculas',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Excelente',
              'Película agregada satisfactoriamente',
              'success',
            );
            this.$router.push({ name: 'Inicio' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Error',
              'No se pudo agregar la pelicula, verifique con el administrador',
            );
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
