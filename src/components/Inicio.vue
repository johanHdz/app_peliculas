<!-- <template>
  <v-layout row wrap>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Batman vs Superman</div>
            <span class="grey--text">2016 &middot; Ciencia Ficci&oacute;n
              /Acci&oacute;n &middot; 3h 3m</span>
          </div>
        </v-card-title>
        <v-card-text>
          Han pasado casi dos años desde que la colosal batalla de Superman (Henry Cavill) con Zod
          (Michael Shannon) devastó la ciudad de Metrópolis. La pérdida de vidas y los daños
          colaterales hicieron que muchos se sintieran enojados e impotentes, incluido el
          multimillonario que lucha contra el crimen Bruce Wayne (Ben Affleck). Convencido de que
          Superman es ahora una amenaza para la humanidad, Batman se embarca en una vendetta
          personal para poner fin a su reinado en la Tierra, mientras que el intrigante Lex Luthor
          (Jesse Eisenberg) lanza su propia cruzada contra el Hombre de Acero.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn texto color="purple">Calificar Pel&iacute;cula</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Resident Evil: Capitulo Final</div>
            <span class="grey--text">2016 &middot; Acción/Terror &middot; 1h 46m</span>
          </div>
        </v-card-title>
        <v-card-text>
          Alice regresa a Raccoon City, donde empezó todo, para salvar a la humanidad del ataque
          definitivo que la Corporación Umbrella está preparando para eliminar a los supervivientes
          del apocalipsis. Por el camino reclutará aliados, alguno de ellos inesperado, sin los que
          será imposible luchar contra las hordas de zombis y nuevos tipos de monstruos que los
          esperan.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar Pel&iacute;cula</v-btn> v-btn flat color
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Capitán América: Civil War</div>
            <span class="grey--text">2016 &middot; Acción/Aventura &middot; 2h 28m</span>
          </div>
        </v-card-title>
        <v-card-text>
          Después de que otro incidente internacional, en el que se ven envueltos los Vengadores,
          produzca daños colaterales, la presión política obliga a poner en marcha un sistema para
          depurar responsabilidades.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar Pel&iacute;cula</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">La Quinta Ola</div>
            <span class="grey--text">2016 &middot; Ciencia Ficci&oacute;n
              /Acci&oacute;n &middot; 1h 52m</span>
          </div>
        </v-card-title>
        <v-card-text>
          Con la humanidad a punto de extinguirse tras cuatro devastadores ataques alienígenas, la
          joven Cassey, de 16 años, intenta encontrar y proteger a su hermano pequeño durante la
          quinta ofensiva extraterrestre.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar Pel&iacute;cula</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Talento Ocultos</div>
            <span class="grey--text">2016 &middot; Drama/Ficción Histórica &middot; 2h 7m</span>
          </div>
        </v-card-title>
        <v-card-text>
          La historia, hasta ahora desconocida, de tres científicas afroamericanas que trabajaron
          para la NASA a comienzos de la década de 1960, colaborando en la operación espacial con
          la que los EE. UU. le ganaron la partida a la URSS en la Guerra Fría. Al mismo tiempo,
          estas brillantes mujeres lucharon por los derechos civiles de los afroamericanos.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar Pel&iacute;cula</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Hasta el último hombre</div>
            <span class="grey--text">2016 &middot; Bélico/Drama &middot; 2h 19m</span>
          </div>
        </v-card-title>
        <v-card-text>
          La historia de Desmond T. Doss, quien, debido a que se lo prohibía su fe, combatió en
          la Segunda Guerra Mundial sin portar un arma. No disparó ni una bala, pero salvó a 75
          personas de la muerte en la batalla de la isla de Okinawa. Gracias a su coraje, pasó de
          ser el objeto de las burlas de sus compañeros a reconocérsele su enorme valía con la
          entrega de la Medalla de Honor del Congreso, otorgada por primera vez a un objetor
          de conciencia.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple">Calificar Pel&iacute;cula</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template> -->
<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="pelicula in peliculas" :key="pelicula._id">
      <v-card>
        <v-card-title>
          <div>
            <div class="headline">
              <v-btn text v-bind:to="`/peliculas/${pelicula._id}`">
                {{ pelicula.nombre }}
              </v-btn>
            </div>
            <span class="grey--text" style="font-size:1rem">{{ pelicula.anio_pub }}
              &middot; {{ pelicula.genero }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ pelicula.descripcion }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default{
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
      // const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        // url: 'http://localhost:8081/peliculas',
        url: '/peliculas',
        // headers: {
        //   Authorization: `JWT ${token}`,
        //   'Content-Type': 'application/json',
        // },
      })
        .then((respuesta) => {
          this.peliculas = respuesta.data.peliculas;
          this.usuario_actual = respuesta.data.usuario_actual;
        })
        .catch(() => {
        });
    },
  },
};
</script>
