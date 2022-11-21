<template>
    <v-layout row wrap>
        <v-flex xs4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ pelicula.nombre }}</div>
                        <span class="grey--text">{{ pelicula.anio_pub }} &middot;
                        {{ pelicula.genero }}</span>
                    </div>
                </v-card-title>
                <!-- <h6 class="card-title" v-if="usuario_actual" @click="calificar"> -->
                <v-btn class="card-title" @click="calificar">
                  Calificar {{ pelicula.nombre }}</v-btn>
                <v-card-text>
                    {{ pelicula.descripcion}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
const estado = {
  nota: 0,
};
const ComponenteEstrellas = Vue.extend({
  data() {
    return { calif: 0 };
  },
  watch: {
    calif(nuevoValor) { estado.nota = nuevoValor; },
  },
  template: `
  <div class="rating">
    ¿Qué le pareció esta película?
    <star-rating v-model="calif" :show-rating="false"></star-rating>
  </div>`,
  components: { 'star-rating': StarRating },
});

const componente = new ComponenteEstrellas().$mount(wrapper);

export default{
  name: 'Pelicula',
  data() {
    return {
      pelicula: [],
    };
  },
  mounted() {
    this.obtenerPelicula();
  },
  methods: {
    async calificar() {
      this.$swal({
        content: componente.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      })
        .then(() => {
          const peliculaId = this.$route.params.id;
          return axios({
            method: 'post',
            data: {
              calificacion: estado.nota,
            },
            url: `http://localhost:8081/peliculas/calificar/${peliculaId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal('CineStack', `Gracias por calificar esta película: ${estado.nota}`,
                'success');
            })
            .catch((er) => {
              // const msj = error.response.data.message;
              this.$swal('Error', er.message, 'error');
            });
        });
    },
    async obtenerPelicula() {
      return axios({
        method: 'get',
        // url: `http://localhost:8081/peliculas/${this.$route.params.id}`,
        url: `/peliculas/${this.$route.params.id}`,
      })
        .then((respuesta) => {
          this.pelicula = respuesta.data;
        })
        .catch(() => {
        });
    },
  },
};
</script>
