<template>
    <v-layout row wrap>
        <v-flex xs4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ pelicula.nombre }}</div>
                        <span class="grey--text">{{ AgregarPeliculaVue.anio_pub }} &middot; 
                        {{ pelicula.genero }}</span>
                    </div>
                </v-card-title>
                <h6 class="card-title">Calificar {{ pelicula.nombre}}</h6>
                <v-card-text>
                    {{ pelicula.descripcion}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

export default{
  name: 'Pelicula',
  data() {
    return {
      peliculas: [],
    };
  },
  mounted() {
    this.obtenerPeliculas();
  },
  methods: {
    async obtenerPeliculas() {
      return axios({
        method: 'get',
        url: `http://localhost:8081/api/peliculas/${this.route.params.id}`,
      })
        .then((respuesta) => {
          this.peliculas = respuesta.data;
        })
        .catch(() => {
        });
    },
  },
};
</script>
